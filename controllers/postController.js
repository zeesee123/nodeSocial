const Post=require('../models/Post');


// console.log(post);

exports.viewCreateScreen=(req,res)=>{
    //need to use a middleware in here
    res.render('create-post',{success:req.flash('success_post')});
}


exports.addPost=(req,res)=>{

    let post=new Post(req.body,req.session.user.id);

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


exports.viewPost=function(req,res){

    try{
        Post.findSingle(req.params.id).then((data)=>{console.log(data);let user_id=data.userId;res.render('single-post-screen',{post:data,user_id:user_id})}).catch((er)=>{
            console.log(er.message);
        });
    }catch(er){
        console.log('error',er.message);
        res.render('404');
    }
}

exports.editPostscreen=(req,res)=>{

    try{

        Post.findSingle(req.params.id).then((data)=>{
            res.render('edit-post',{postdata:data,success:req.flash('post_update')});
        }).catch((er)=>{console.log(er.message);});

    }catch(er){

        console.log('error',er.message);
        res.render('404');

    }
}

exports.editPost=(req,res)=>{

    try{

        console.log('this is the request data',req.body);

        

        let newreq=req.body;
        newreq.id=req.params.id;

        console.log('request new one',newreq);
        // process.exit();

        let post=new Post(newreq,req.session.user.id);

        post.edit().then((data)=>{console.log(data);
            req.flash('post_update','post has been updated');

            res.redirect(`/edit-post/${req.params.id}`);}).catch((er)=>{console.log(er);});

        console.log(req);

        // router.post('/edit-post/:id',postController.editPost);

       

    }catch(er){

        console.log('this is the error',er.message);

    }
}