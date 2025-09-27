const express=require('express');
const {addOcena,updateOcena,getOcena, getChats}=require('../Controllers/ocena');
const {isKorisnik, isMajstor}=require('../Middleware/checkAuth');
const router=express.Router();
router.post("/",isKorisnik,addOcena);
router.put("/",isKorisnik,updateOcena);
router.get("/",isKorisnik,getOcena);
router.get("/chats",isMajstor,getChats);
module.exports=router;