const express=require('express');
const router=express.Router();
const {getKategorije}=require('../Controllers/kategorije');
router.get("/",getKategorije);
module.exports=router;