const express=require('express');
const {addLokacija,getLokacije}=require('../Controllers/lokacija')
const router=express.Router();
router.post("/add",addLokacija);
router.get("/",getLokacije);
module.exports=router;