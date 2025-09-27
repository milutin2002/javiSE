const mongoose=require('mongoose');
const podkategorijaSchema=mongoose.Schema({
    naziv:{type:String,required:true},
    kategorija:{type:mongoose.Schema.ObjectId,required:true,ref:"kategorija"}
});
module.exports=mongoose.model("podkategorija",podkategorijaSchema);