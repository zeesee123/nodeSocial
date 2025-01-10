// const validator=require('validator');
const {getDB}=require('../db.js');


let Post=function(data){

    this.data=data;
    this.errors=[];
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

    this.data={title:this.data.title.trim(),body:this.data.body.trim()};
}

Post.prototype.validate=function(){

    if(this.data.title.trim()==""){

        this.errors.push('title is required');
    }

    if(this.data.body.trim()==""){

        this.errors.push('body is required');

    }
}


module.exports=Post;