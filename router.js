const express=require('express');
const router=express.Router();
const User=require('./models/User');
const userController=require('./controllers/userController');


// console.log(User);

console.log(User);

router.get('/',userController.home);

router.post('/register',userController.register);

router.post('/login',userController.login);

router.post('/logout',userController.logout);

module.exports=router;