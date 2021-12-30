

const mongoose=require('mongoose');
const usersSchema=new mongoose.Schema({
    mail:{type:String,required:true},username:{type:String,required:true},password:{type:String,required:true},isAdmin:{type:Boolean,default:false}
})
module.exports= mongoose.model('users',usersSchema)