const ocena=require('../Models/ocena');
module.exports.addOcena=async(req,res,next)=>{
    const userId=req.userData.userId;
    const {majstorId}=req.body;
    const ocenaUser=req.body.ocena;
    const o=await ocena.findOne({korisnik:userId,majstor:majstorId});
    if(o){
        res.status(400).json({message:"Ocena already added"});
        return;
    }
    const ocenaAdd=new ocena({
        korisnik:userId,
        majstor:majstorId
    });
    ocenaAdd.save().then((o)=>{
        if(o===ocenaAdd){
            res.status(201).json({message:"Kontakt added"});
        }
        else{
            res.status(400).json({message:"Kontakt not added"});
        }
    });
}
module.exports.updateOcena=async(req,res,next)=>{
    const userId=req.userData.userId;
    const {majstorId}=req.body;
    const ocenaUser=req.body.ocena;
    const o=await ocena.findOne({korisnik:userId,majstor:majstorId});
    if(!o){
        res.status(400).json({message:"Kontakt not added"});
        return;
    }
    console.log(ocenaUser);
    await ocena.updateOne({korisnik:req.userData.userId,majstor:majstorId},{ocena:ocenaUser});
    res.status(200).json({message:"Ocena added"});
}
module.exports.getOcena=async(req,res,next)=>{
    const ocene=await ocena.find({korisnik:req.userData.userId}).populate('majstor');
    res.status(200).json({ocene:ocene});
}
module.exports.getChats=async(req,res,next)=>{
    const chats=await ocena.find({majstor:req.userData.userId}).populate('lastMessage').populate('korisnik');
    res.status(200).json({chats:chats});
}