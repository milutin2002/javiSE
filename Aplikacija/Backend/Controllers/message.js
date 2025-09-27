const { isKorisnik } = require('../Middleware/checkAuth');
const message=require('../Models/message');
module.exports.message=async(req,res,next)=>{
    const id=req.params.id;
    const messages=await message.find({chat:id});
    res.status(200).json({messages:messages});
}