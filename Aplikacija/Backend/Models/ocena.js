const mongoose=require('mongoose');
const ocenaSchema=mongoose.Schema({
    korisnik:{type:mongoose.Schema.ObjectId,required:true,ref:"majstor"},
    ocena:{type:Number},
    majstor:{type:mongoose.Schema.ObjectId,required:true,ref:"majstor"},
    lastMessage:{type:mongoose.Schema.ObjectId,ref:"message"}
});
module.exports=mongoose.model("ocena",ocenaSchema);