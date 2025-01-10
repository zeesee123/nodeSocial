const Post=require('../models/Post');

// console.log(post);

exports.viewCreateScreen=(req,res)=>{
    //need to use a middleware in here
    res.render('create-post',{success:req.flash('success_post')});
}


exports.addPost=(req,res)=>{

    let post=new Post(req.body);

    post.create().then(function(data){

        console.log(data);

        req.flash('success_post','post has been added');
        
        req.session.save(function(){

            res.redirect('/create-post');
        });
        // res.redirect('/create-post',{});

    }).catch((er)=>{

        console.log('this is the error ',er.message);

    });
}