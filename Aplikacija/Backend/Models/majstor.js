const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const majstorSchema=mongoose.Schema({
    email:{type:String,required:true},
    ime:{type:String,required:true},
    prezime:{type:String,required:true},
    password:{type:String,required:true},
    broj:{type:String},
    kategorija:[{type:String}],
    podkategorija:[{type:mongoose.Schema.ObjectId,required:true,ref:"podkategorija"}],
    ratingSum:{type:Number,required:true},
    ratingCount:{type:Number,required:true},
    profilePicture:{type:String,required:true},
    lokacija:{type:mongoose.Schema.ObjectId,required:true,ref:"lokacija"},
    adresa:{type:String,required:true},
    type:{type:String,required:true}
});
majstorSchema.plugin(uniqueValidator);
module.exports=mongoose.model('majstor',majstorSchema);