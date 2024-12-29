const {MongoClient}=require('mongodb');

const client=new MongoClient(process.env.CONNECTIONSTRING);

let db;

async function connectDB(){

    try{

        console.log('trying to connect to the db');
        await client.connect();
        db=client.db('ComplexApp');

        console.log('connected to the database');

    }catch(err){

        console.log('cannot connect to the database',err.message);
    }
    


}

function getDB(){

    if(!db){

        console.log('the db does not have a valid value');

    }else{

        return db;

    }
}

function getClient(){

    return client;
}


module.exports={connectDB,getDB,getClient};
// async function start(){
//     await client.connect();
//     // client.db();
//     module.exports=client.db('ComplexApp');
//     const app=require('./app');
//     app.listen(3000,()=>{

//         console.log('the server is running');
//     })

// }

// start();