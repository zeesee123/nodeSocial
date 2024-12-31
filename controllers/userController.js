const User=require('../models/User');

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
    user.login().then(function(data){
        req.session.user={id:attemptedUser._id,username:attemptedUser.username};
        // res.redirect('/');
        req.session.save(function(){
            res.redirect('/');
        })
    }).catch((er)=>{
        req.flash('errors',`sorry there is a problem:${e}`);
        req.session.save(function(){
            res.redirect('/');
        })});
    // await res.send(user.login());
    // console.log(result);
    // res.send('he');
}


exports.home=function(req,res){

    if(req.session.user){
        res.render('home-dashboard',{username:req.session.user.username});
    }else{

        res.render('home-guest');
    }
    // 


}

exports.logout=function(req,res){

    req.session.destroy();

    res.clearCookie('connect.sid');

    res.redirect('/');


}