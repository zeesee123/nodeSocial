const validator=require('validator');
const {getDB}=require('../db');
const bcrypt=require('bcrypt');
const {ObjectId}=require('mongodb');


// const userCollection=require('../db').collection('name');

// console.log(userCollection);
// console.log(db);

let User=function(data){

    this.data=data;
    this.errors=[];
    this.collection=null;
    this.posts=null;
}

User.prototype.setUpCollection=function(){

    try{

        if(!this.collection){

            let db=getDB();

            if(!db){

                console.log('db not initialized');

            }else{

                this.collection=db.collection('users');
                this.posts=db.collection('posts');
            }

            
        }

        


    }catch(er){

        console.log('this is the error',er.message);
    }

}

User.prototype.cleanup=function(){

   if(typeof(this.data.username)!="string"){
    this.data.username="";
   }

   if(typeof(this.data.password)!="string"){
    this.data.password="";
   }

   if(typeof(this.data.email)!="string" && !validator.isEmail(this.data.username)){

    this.data.email="";

   }

   this.data={username:this.data.username.trim(),password:this.data.password.trim(),email:this.data.email.trim()};
}

User.prototype.validate=function(){
    console.log('this is the data',this.data);

    if(this.data.username==""){

        this.errors.push("Username cannot be empty");
    }else{
        if(this.data.username.length<2){

            this.errors.push("Username must be greater than 2 characters");
        }else if(this.data.username.length>30){
    
            this.errors.push("Username cannot be greater than 30 characte");
        }else{}
    }

   

    

    if(this.data.email==""){

        this.errors.push("Email cannot be empty");
    }

    if(this.data.password==""){

        this.errors.push("Password cannot be empty");
    }else{

        if(this.data.password.length<2){

            this.errors.push("Password must be greater than 2 characters");
        }else if(this.data.password.length>30){
    
            this.errors.push("Username cannot be greater than 30 characte");
        }else{}
    }

    
}

User.prototype.register=async function(){

    this.cleanup();

    this.validate();

    if(this.errors.length<=0){

        this.setUpCollection();
        // let db=getDB();
        // let collection=db.collection('users');

        const salt=10;
        this.data.password=await bcrypt.hash(this.data.password,salt);
        // console.log(collection);
        this.collection.insertOne(this.data);
    }
}

User.prototype.login=async function(){

    this.cleanup();
    this.setUpCollection();

    return new Promise(async(resolve,reject)=>{

        let attemptedUser=await this.collection.findOne({username:this.data.username});

        let posts=await this.posts.find({userId:attemptedUser._id}).toArray();

        attemptedUser.posts=posts;

        console.log('these are the associated posts with the user',posts);

        console.log('this is the attempted user',attemptedUser);

        // if(attemptedUser && attemptedUser.password==this.data.password){
        if(attemptedUser && await bcrypt.compare(this.data.password,attemptedUser.password)){
//my goal for now is to display the posts associated with the user who just logged in
           
            resolve(attemptedUser);
            // resolve("great");

        }else{

            reject("Invalid username or password");
        }
    });

    // attemptedUser=await this.collection.findOne({username:this.data.username});

    // console.log('this is the attempted user',attemptedUser);

    // if(attemptedUser && attemptedUser.password==this.data.password){

    //     callback("great");
    // }else{

    //     callback("nah");
    // }


}

User.findUser=async function(id){

    let db=getDB();

    let user=await db.collection('users').findOne({_id:new ObjectId(id)});

    let posts=await db.collection('posts').find({userId:new ObjectId(id)}).toArray();

    user.posts=posts||null;
    // console.log(posts);

    return new Promise((resolve,reject)=>{

        if(user){

            resolve(user);

        }else{

            reject('there is no such user');
        }
    })


}




module.exports=User;