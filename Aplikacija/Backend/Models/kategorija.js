const mongoose=require('mongoose');
var kategorijaSchema=mongoose.Schema({
    naziv:{type:String}
});
module.exports.kategorija=mongoose.model("Kategorija",kategorijaSchema);