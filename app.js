const express=require('express');
const mongostore=require('connect-mongo');
const {getClient}=require('./db');
let app=express();

const session=require('express-session');

let sessionOptions=session({
    secret:"javalele",
    store:mongostore.create({client:getClient()}),
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
})
console.log('this is branch two');
app.use(sessionOptions);

// const User=require('./models/User');

// console.log('this is the value of user',User);

app.set('views','views');

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

const router=require('./router');

// console.log(router);

app.use('/',router);

// app.get('/',(req,res)=>{

//     // res.send('hello oliver');
//     res.render('home-guest');
// });

module.exports=app;
