const express=require('express');
const router=express.Router();
const User=require('./models/User');
const userController=require('./controllers/userController');
const postController=require('./controllers/postController');


// console.log(User);

console.log(User);

router.get('/',userController.home);

router.post('/register',userController.register);

router.post('/login',userController.login);

router.post('/logout',userController.logout);

router.get('/create-post',userController.mustBeLoggedIn,postController.viewCreateScreen);

router.post('/add-post',postController.addPost);

router.get('/view-post/:id',postController.viewPost);

router.get('/profile/:id?',userController.profile);

router.get('/edit-post/:id',postController.editPostscreen);

router.post('/edit-post/:id',postController.editPost);



module.exports=router;