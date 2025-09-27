const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
    title:{type:String,required:true,default:"Rad"},
    content:{type:String,required:true},
    podkategorija:{type:mongoose.Schema.ObjectId,required:true,ref:"podkategorija"},
    datumModifikacije:Date,
    slike:[{type:String}],
    creator:{type:mongoose.Schema.ObjectId,required:true,ref:"majstor"}
});
module.exports=mongoose.model('post',postSchema);