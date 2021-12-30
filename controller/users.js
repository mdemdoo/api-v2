const md5 = require("md5");
const express =require('express');
const app=express()
const Users=require('../models/users')
const jwt=require('jsonwebtoken');


const accessToken=jwt.sign({
    id:Users._id,
    isAdmin:Users.isAdmin
},process.env.JWTSEC,
{expiresIn:"3d"}
)

const updateUser=async(req,res)=>{
    if(req.body.password){
        req.body.password=md5(req.body.password)
    }
const updatedUser=await Users.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true})
res.json(updatedUser)
}





const register=async(req,res)=>{
Users.find({mail:req.body.mail}).then(resp=>{
    if(resp.length!=0){
        return res.json({msg:"mail exists"})
    }

    else{
        const users= Users.create({
            mail:req.body.mail,
            password:md5(req.body.password),
            username:req.body.username
        
        })
        
        
        res.json({users}) 
    }}) 



}

//login
const login= async(req,res)=>{
    await Users.find({
        mail:req.body.mail,
        password:md5(req.body.password)
      }).then(resp=>{
        if(resp.length!=0){
            
            return res.json({msg:"login success",accessToken})
        }
    
        else{
         return res.json ({msg:"faild"})
            
            
        }}) 
    
    
    
    }

const allUseres=async(req,res)=>{
   const users= await Users.find({})
   res.json({users})
   
}

const getUser=async(req,res)=>{
    collection.findOne({username:username})
    return res.json({username})
    
}

module.exports={
    register,
    login,
    allUseres,
    getUser,
    updateUser,
   
}