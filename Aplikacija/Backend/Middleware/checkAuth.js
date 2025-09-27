require('dotenv').config();
const jwt=require('jsonwebtoken');
function isSomething(type){
    return (req,res,next)=>{
        try{
            const token=req.headers.authorization;
            var decoded=jwt.verify(token,process.env.JSON_SECRET);
            if(decoded.type===type){
                req.userData={userId:decoded.userId,email:decoded.email};
                next();
            }
            else{
                res.status(403).json({
                    message:"Pogresna vrsta korisnika"
                });
            }
        }catch(err){
            res.status(401).json({
                message:"Niste logovani"
            });
        }
    }
}
module.exports.isMajstor=isSomething("majstor");
module.exports.isKorisnik=isSomething("korisnik");
module.exports.isLoggedIn=(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        var decoded=jwt.verify(token,process.env.JSON_SECRET);
        req.userData={userId:decoded.userId,email:decoded.email};
        next();
    }catch(err){
        res.status(401).json({
            message:"Niste logovani"
        });
    }
}