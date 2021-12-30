require('dotenv').config()
const express =require('express');
const app=express()
const session=require('express-session')
const userroute =require('./routes/userroute')
const bodyParser =require('body-parser')
const products=require('./routes/products')
const connection = require("./db");
const MongodbSession = require('connect-mongodb-session')(session);
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json())
 //app.use(express.static(''))>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 

 connection();


const store=new MongodbSession({
    uri:process.env.DB,
    collection:"mySessions",
});
app.use(
    session({
        secret:"thet key",
        resave:false,
        saveUninitialized:false,
        store:store,
    })
)



 
 
app.use('/api/user', userroute)//for users

app.use('/api/products',products)//for products




app.listen(5000,()=>{
    console.log ('connected to port 5000');
})
