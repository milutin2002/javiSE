require('dotenv').config();
const mongoose=require('mongoose');
const {kategorija}=require('./Models/kategorija');
const podkategorija=require("./Models/podkategorija");
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.pjgvfkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    console.log("Connection connected");
    const podkategorije=[['Zidarski radovi','Molerski radovi','Keramičarski radovi','Tesarski radovi','Električarski radovi','Vodoinstalaterski radovi'],['Popravke električnih uređaja','Popravke vodovodnih instalacija','Popravke kućnih aparata','Popravke nameštaja','Servisiranje vozila'],['Dekoracija','Nameštaj po meri','Postavljanje podova','Ugradnja kuhinja i kupatila','Osvetljenje i rasveta'],['Održavanje dvorišta','Postavljanje ograde','Izrada i održavanje bašti','Postavljanje terasa i staza'],['Renoviranje kupatila','Renoviranje kuhinje','Adaptacija prostorija','Zamena stolarije','Fasaderski radovi']];
    const data=['Građevinski radovi','Popravke i održavanje','Uređenje enterijera','Spoljni radovi','Remont i renoviranje'];
    const kategorije=[];
    for (let i = 0; i < data.length; i++) {
        const  addKategorija=new kategorija({naziv:data[i]});
        addKategorija.save();
        for (let j = 0; j < podkategorije[i].length; j++) {
            const addPodkategorija=new podkategorija({
                naziv:podkategorije[i][j],
                kategorija:addKategorija._id
            });
            addPodkategorija.save();
        }
    }
}).catch((e)=>{
    console.log(e);
});
