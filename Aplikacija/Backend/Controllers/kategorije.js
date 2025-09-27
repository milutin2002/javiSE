const {kategorija}=require('../Models/kategorija');
module.exports.getKategorije=async (req,res,next)=>{
    const result=await kategorija.aggregate([{
        $lookup:{
            from: 'podkategorijas', 
                    localField: '_id',
                    foreignField: 'kategorija',
                    as: 'podkategorije'
        }
    }]);
    res.status(200).json({
        kategorije:result
    });
}