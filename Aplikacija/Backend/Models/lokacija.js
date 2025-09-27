const mongoose=require('mongoose');
const lokacijaSchema=mongoose.Schema({
    naziv:{type:String,required:true,unique:true}
});
module.exports=mongoose.model("lokacija",lokacijaSchema);