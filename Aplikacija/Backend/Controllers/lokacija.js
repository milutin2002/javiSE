const lokacija=require('../Models/lokacija');
module.exports.addLokacija=(req,res)=>{
    const locAdd=new lokacija({
        naziv:req.body.naziv
    });
    locAdd.save();
    res.status(201).json({
        message:"Dodata lokacija"
    });
}
module.exports.getLokacije=(req,res)=>{
    lokacija.find().then((result)=>{
        res.status(200).json({
            lokacije:result
        });
    });
}