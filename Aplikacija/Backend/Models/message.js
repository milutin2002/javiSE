const mongoose=require('mongoose');
const messageSchema=mongoose.Schema({
    sadrzaj:String,
    korisnik:{type:mongoose.Schema.ObjectId,ref:"majstor"},
    chat:{type:mongoose.Schema.ObjectId,ref:"ocena"},
    datum:{type:Date,required:true}
});
module.exports=mongoose.model("message",messageSchema);