const post=require('../Models/post');
const podkategorija=require("../Models/podkategorija");
const majstor=require("../Models/majstor");
const Ocena=require('../Models/ocena');
module.exports.addPost=(req,res)=>{
    console.log(post);
    const {title,content,podkategorija}=req.body;
    if(!req.files){
        req.files=[];
    }
    const postAdded=new post({
        title:title,
        content:content,
        podkategorija:podkategorija,
        datumModifikacije:Date.now(),
        slike:req.files.map((file)=>'http://localhost:3000/'+file.path),
        creator:req.userData.userId
    });
    postAdded.save();
    res.status(201).send({
        message:"Post added succesfully",
        post:{
            title:postAdded.title,
            content:postAdded.content,
            kategorija:postAdded.kategorija,
            podkategorija:postAdded.podkategorija,
            slike:postAdded.slike,
            datumModifikacije:postAdded.datumModifikacije,
            id:postAdded._id
        }
    });
};
module.exports.getPost=(req,res)=>{
    post.find({creator:req.userData.userId}).sort({datumModifikacije:-1}).then((document)=>{
        res.status(200).json({
            message:"Post fetched",
            post:document
        });
    });
};
module.exports.getPostById=async (req,res)=>{
    const id=req.params.id;
    console.log("Ovo je get metoda "+id);
    const postById=await post.findOne({_id:id}).populate('podkategorija');
    const majstorId=await majstor.findOne({_id:postById.creator});
    const ocene=await Ocena.find({majstor:majstorId._id}).populate('korisnik');
    let prosek=0.0;
    const ocenjeni=ocene.filter((b)=>b.ocena);
    if(ocenjeni.length!==0){
        const sum=ocenjeni.reduce((a,b)=>a+b.ocena,0);
        prosek=sum/ocenjeni.length;
    }
    return res.status(200).json({post:postById,majstor:majstorId,prosek:prosek});
}
module.exports.deletePost=(req,res)=>{
    post.deleteOne({_id:req.params.id,creator:req.userData.userId}).then(result=>{
        console.log(result);
        res.status(200).json({
                message:"Post deleted!"
        });
    });
}
module.exports.updatePost= async(req,res)=>{
    let files=req.files??[];
    if(!Array.isArray(req.body.deleteImages)){
        req.body.deleteImages=[req.body.deleteImages];
    }
    await post.updateOne({"_id":req.body.id,creator:req.userData.userId},{title:req.body.title,content:req.body.content,kategorija:req.body.kategorija,podkategorija:req.body.podkategorija,datumModifikacije:Date.now(),$pull:{slike:{$in:req.body.deleteImages}}});
    post.updateOne({'_id':req.body.id,creator:req.userData.userId},{$push:{slike:{$each:files.map((file)=>'http://localhost:3000/'+file.path)}}}).then(response=>{
           res.status(200).json({message:"Post updated"});
    });
}
module.exports.getPostByFilter=async(req,res)=>{
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
    let query={podkategorija:{$in:podkategorije}};
    const posts=await post.find(query).populate('creator').populate('podkategorija');
    if(!lokacija){
        res.status(200).json({message:"Posts fetched",post:posts});
    }
    else{
        res.status(200).json({message:"Posts fetched",post:posts.filter(b=>lokacija==b.creator.lokacija)});
    }
}
