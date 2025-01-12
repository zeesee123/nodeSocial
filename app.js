const express=require('express');
const mongostore=require('connect-mongo');
const {getClient}=require('./db');
const flash=require('connect-flash');
let app=express();

const session=require('express-session');

let sessionOptions=session({
    secret:"javalele",
    store:mongostore.create({
        client: getClient(),
        dbName: 'ComplexApp', // Ensure this matches your intended DB
        collectionName: 'sessions', // Optional, defaults to "sessions"
        ttl: 14 * 24 * 60 * 60, // Expiration time (14 days by default)
        autoRemove: 'native', // Use native MongoDB TTL
    }),
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
});

console.log('this is the client',getClient());
console.log('this is branch two');
app.use(sessionOptions);

app.use((req,res,next)=>{

    res.locals.user=req.session.user||null;
    next();
});
// const User=require('./models/User');

// console.log('this is the value of user',User);

app.set('views','views');

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(flash());

app.use(express.urlencoded({extended:true}));

const router=require('./router');

// console.log(router);

app.use('/',router);

// app.get('/',(req,res)=>{

//     // res.send('hello oliver');
//     res.render('home-guest');
// });

module.exports=app;
