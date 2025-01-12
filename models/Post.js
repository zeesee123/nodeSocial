// const validator=require('validator');
const {getDB}=require('../db.js');
const ObjectId=require('mongodb').ObjectId;


let Post=function(data,userId){

    this.data=data;
    this.errors=[];
    this.id=userId;
    this.collection=null;


}

Post.prototype.setupCollection=function(){

    try{

        let db=getDB();

        if(!db){

            console.log('db is not initialized');

        }else{

            this.collection=db.collection('posts');
            console.log(this.collection);
        }

    }catch(er){

        console.log(er.message);
    }
}


Post.prototype.create=function(){

    this.cleanup();
    this.validate();

    this.setupCollection();

    return new Promise((resolve,reject)=>{
        
        

        if(!this.errors.length){

        

            this.collection.insertOne(this.data);
            resolve();

        }else{

            this.errors.push('please try again later');
            reject(this.errors);


        }
    });

}


Post.prototype.cleanup=function(){

    if(typeof(this.data.title)!="string"){

        this.data.title="";
    }

    if(typeof(this.data.body)!="string"){

        this.data.body="";
    }

    this.data={title:this.data.title.trim(),body:this.data.body.trim(),createdAt:new Date(),userId:new ObjectId(this.id)};
}

Post.prototype.validate=function(){

    if(this.data.title.trim()==""){

        this.errors.push('title is required');
    }

    if(this.data.body.trim()==""){

        this.errors.push('body is required');

    }
}

Post.findSingle=function(id){

    console.log('this is the id',id);

    return new Promise(async(resolve,reject)=>{

        if(typeof(id)!="string"){

            reject('id is not valid');
        }else{

            let db=getDB();
            let post=await db.collection('posts').findOne({_id:new ObjectId(id)});

            let user=await db.collection('users').findOne({_id:new ObjectId(post.userId)});

            post.user=user;

            console.log('this is the post',post);

            if(post){

                resolve(post);

            }else{

                reject(' there is no post as such');
            }
        }
            
            


            

        
    })


}


module.exports=Post;