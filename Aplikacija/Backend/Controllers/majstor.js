require('dotenv').config();
const mongoose=require('mongoose');
const podkategorija=require('../Models/podkategorija');
const majstor=require('../Models/majstor');
const post=require('../Models/post');
const bcrypt=require('bcrypt');
const { json } = require('body-parser');
const jwt=require('jsonwebtoken');
const { query } = require('express');
const ObjectId = mongoose.Types.ObjectId;
const Ocena=require('../Models/ocena');
const kategorijeAll=['Građevinski radovi','Popravke i održavanje','Uređenje enterijera','Spoljni radovi','Remont i renoviranje'];
const podkategorijeAll={'Građevinski radovi': ['Zidarski radovi','Molerski radovi','Keramičarski radovi','Tesarski radovi','Električarski radovi','Vodoinstalaterski radovi'],'Popravke i održavanje':['Popravke električnih uređaja','Popravke vodovodnih instalacija','Popravke kućnih aparata','Popravke nameštaja','Servisiranje vozila'],'Uređenje enterijera':['Dekoracija','Nameštaj po meri','Postavljanje podova','Ugradnja kuhinja i kupatila','Osvetljenje i rasveta'],'Spoljni radovi':['Održavanje dvorišta','Postavljanje ograde','Izrada i održavanje bašti','Postavljanje terasa i staza'],'Remont i renoviranje':['Renoviranje kupatila','Renoviranje kuhinje','Adaptacija prostorija','Zamena stolarije','Fasaderski radovi']};
module.exports.signup=function setSignUp(type){
    return async (req,res,next)=>{
    const {email,password,broj,kategorija,podkategorija,lokacija,adresa,ime,prezime}=req.body;
    bcrypt.hash(password,10).then((hash)=>{
        const newMajstor=new majstor({
            ime:ime,
            prezime:prezime,
            email:email,
            password:hash,
            broj:broj,
            podkategorija:podkategorija,
            ratingSum:0,
            ratingCount:0,
            profilePicture:"http://localhost:3000/images/default-profile.jpg",
            lokacija:lokacija,
            adresa:adresa,
            type:type
        });
        newMajstor.save().then(user=>{
            if(user===newMajstor){
                res.status(200).json({
                    message:"User created"
                });
            }
            else{
                res.status(400).json({
                    message:"Bad request"
                });
            }
        }); 
    });
}
};
module.exports.signupKorisnik=async (req,res,next)=>{
    const {email,password,broj,kategorija,podkategorija,lokacija,adresa,ime,prezime}=req.body;
    bcrypt.hash(password,10).then((hash)=>{
        const newMajstor=new majstor({
            ime:ime,
            prezime:prezime,
            email:email,
            password:hash,
            broj:broj,
            kategorija:[],
            podkategorija:[],
            ratingSum:0,
            ratingCount:0,
            profilePicture:"http://localhost:3000/images/default-profile.jpg",
            lokacija:lokacija,
            adresa:adresa,
            type:"korisnik"
        });
        newMajstor.save().then(user=>{
            if(user===newMajstor){
                res.status(200).json({
                    message:"User created"
                });
            }
            else{
                res.status(400).json({
                    message:"Bad request"
                });
            }
        });
    });
}
module.exports.signin=function setSignIn(type){
    return (req,res,next)=>{
    const {email,password}=req.body;
    majstor.find({email:email}).then(async (result) => {
        if(!result){
            return res.status(401).json({
                message:"Log in neuspesan"
            });
        }
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            const has= await bcrypt.compare(password,result[i].password);
            console.log(result[i].email);
            if(has){
                const token=jwt.sign({userId:result[i]._id,email:result[i].email,type:result[i].type},process.env.JSON_SECRET,{expiresIn:"24h"});
                return res.status(201).json({
                    message:"Log in uspesan",
                    token:token,
                    type:result[i].type
                });
            }
        }
        res.status(400).json({
            message:"Log in neuspesan"
        });
    }).catch((err) => {
        console.log(err);
        res.status(401).json({
            message:"Log in neuspesan"
        });
    });
}};
module.exports.update=(req,res,next)=>{
    let {ime,prezime,broj,kategorija,podkategorija,lokacija,adresa}=req.body;
    if(!podkategorija){
        podkategorija=[];
    }
    const post={ime:ime,prezime:prezime,broj:broj,kategorija:kategorija,podkategorija:podkategorija,lokacija,adresa:adresa};
    console.log(podkategorija.length);
    if(req.file){
        post["profilePicture"]="http://localhost:3000/images/"+req.file.filename;
    }
    majstor.updateOne({_id:req.userData.userId},post).then((result)=>{
        res.status(200).json({
            message:result
        });
    });
}
module.exports.changePassword= async(req,res,next)=>{
    const {oldPassword,password}=req.body;
    let maj=await majstor.findOne({_id:req.userData.userId});
    let valid=await bcrypt.compare(oldPassword,maj.password);
    if(valid){
        bcrypt.hash(password,10).then((data)=>{
            maj.password=data;
            maj.save();
        });
        res.status(200).json({
            message:"You changed password"
        });
    }
    else{
        res.status(400).json({
            message:"You didn't change password"
        });
    }
}

module.exports.getMajstors=async(req,res,next)=>{
    try{
    const {kategorija,podKategorija,lokacija}=req.query;
    let podkategorije=[];
    console.log(lokacija);
    if(kategorija){
        //console.log(podkategorijaM);
        podkategorije=await podkategorija.find({kategorija:kategorija});
        //console.log(podkategorije);
        podkategorije=podkategorije.map(b=>b._id);
    }
    else{
        podkategorije=[podKategorija];
    }
    podkategorije=podkategorije.map(b=>new ObjectId(b));
    //let query={};
    let query={podkategorija:{$elemMatch:{$in:podkategorije}},type:"majstor"};
    if(lokacija){
        query["lokacija"]=new ObjectId(lokacija);
    }
    majstor.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'ocenas', 
                    localField: '_id',
                    foreignField: 'majstor',
                    as: 'ocene'
                }
            },
            {
                $addFields: {
                    ratingCount: { $size: '$ocene.ocena' },
                    ratingSum: { $sum: '$ocene.ocena' }
                }
            },
            {
                $addFields: {
                    averageRating: {
                        $cond: {
                            if: { $gt: ['$ratingCount', 0] },
                            then: { $divide: ['$ratingSum', '$ratingCount'] },
                            else: 0
                        }
                    }
                }
            },
            {
                $project: {
                    email: 1,
                    ime:1,
                    prezime:1,
                    broj: 1,
                    podkategorija: 1,
                    profilePicture: 1,
                    lokacija: 1,
                    adresa: 1,
                    ratingSum: 1,
                    ratingCount: 1,
                    averageRating: 1
                }
            }
        ]).then((docs) => {
            res.json({
                message: "Majstors fetched",
                majstors: docs
            });
        }).catch((err) => {
            res.status(500).json({ message: "Error fetching majstors", error: err });
        });
    }catch(e){
        res.status(500).json({"message":e.message});
    }
}
module.exports.getProfile=async (req,res,next)=>{
    const result=await majstor.findOne({_id:req.userData.userId}).populate("podkategorija").populate("lokacija");
    res.json(result);
}
module.exports.getInfo=async (req,res,next)=>{
        console.log(req.params);
        const result=await majstor.findOne({_id:req.params.id}).populate("podkategorija").populate("lokacija");
        const ocene=await Ocena.find({majstor:req.params.id}).populate('korisnik');
        const posts=await post.find({creator:req.params.id});
        let prosek=0.0;
        const ocenjeni=ocene.filter((b)=>b.ocena);
        if(ocenjeni.length!==0){
            const sum=ocenjeni.reduce((a,b)=>a+b.ocena,0);
            prosek=sum/ocenjeni.length;
        }
        res.status(200).json({majstor:result,ocene:ocene,prosek:prosek,post:posts});
}