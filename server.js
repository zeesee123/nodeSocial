const dotenv=require('dotenv');

dotenv.config();

console.log(new Date())

const {getDB,connectDB}=require('./db');

const app=require('./app');

// connectDB();

// let db=getDB();

// app.listen(3000,()=>{
    
//     console.log('the server is running');
// });

(async()=>{

    try{

        await connectDB();

        app.listen(process.env.PORT,()=>{
        
            console.log('the server is running just fine');
        });

    }catch(err){

        console.log('there is an error',err.message);
    }

    
})();