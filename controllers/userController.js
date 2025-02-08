const User=require('../models/User');



exports.mustBeLoggedIn=function(req,res,next){

    if(req.session.user){
        
        next();

    }else{

        req.flash('errors','you must be logged in');
        
        req.session.save(function(){

            res.redirect('/');
        });
    }

}

// above is a middleware to check whether someone is logged in or not


exports.register=function(req,res){

    let user=new User(req.body);
    console.log(req.body);
    console.log(user);

    console.log('user.reg');
    user.register();

    if(user.errors.length>0){

        res.send(user.errors);

    }else{

        res.send('gog ');
    }

    //res.send('you tried to submit the form');
}

exports.login=function(req,res){

    let user=new User(req.body);
    user.login().then(function(attemptedUser){
        console.log('value of data for login is',attemptedUser);
        req.session.user={id:attemptedUser._id,username:attemptedUser.username,posts:attemptedUser.posts};
        // res.redirect('/');
        req.session.save(function(){
            res.redirect('/');
        })
    }).catch((er)=>{
        req.flash('errors',er);
        req.session.save(function(){
            res.redirect('/');
        })});
    // await res.send(user.login());
    // console.log(result);
    // res.send('he');
}


exports.home=function(req,res){

    if(req.session.user){
        res.render('home-dashboard',{username:req.session.user.username,posts:req.session.user.posts});
    }else{

        res.render('home-guest',{errors:req.flash('errors')});
    }
    // 


}

exports.profile=function(req,res){

    id=req.params.id||null;

    User.findUser(id).then((data)=>{
        
        console.log(data);
        
        res.render('profile',{userinfo:data})}).catch((er)=>{
        
        console.log(er.message);
    });

    // res.render('profile');
}



exports.logout=function(req,res){

    req.session.destroy();

    res.clearCookie('connect.sid');

    res.redirect('/');


}