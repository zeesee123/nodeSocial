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

    return new Promise(async(resolve,reject)=>{
        
        

        if(!this.errors.length){

        

            await this.collection.insertOne(this.data);
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

Post.prototype.edit=function(){
    
    console.log('edit model thing',this.data.title);

    console.log('this is the data 1 *********',this.data);

    let postid=this.data.id;
    

    this.cleanup();
    this.validate();

    console.log('this is the data after validating *********&&&&&&&&&',this.data);

    

    this.setupCollection();

    return new Promise(async(resolve,reject)=>{


        console.log('promise thing data inside the promise*****&&&&&&&',this.data);

        
        
        

        if(!this.errors.length){

            // let ele=await this.collection.findOne({_id:new ObjectId(this.data.id)});

             

             console.log('this is the id',this.data.id);
             

             

             await this.collection.updateOne({_id:new ObjectId(postid)},{$set:{title:this.data.title,body:this.data.body}});

             

            

            // post=this.collection.updateOne({_id:}this.data);
            resolve("done");

        }else{

            this.errors.push('please try again later');
            reject(this.errors);


        }
    });
}


Post.findUserPosts=function(id){

    return new Promise(async(resolve,reject)=>{

        if(typeof(id)!="string"){

            reject('wrong');

        }else{

            let db=getDB();

            let posts=await db.collection('posts').find({userId:new ObjectId(id)}).toArray();

            
            if(posts){

                resolve(posts);

            }else{

                reject('there are no posts');
            }
        }
    });

    
}

module.exports=Post;