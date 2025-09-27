const express=require('express');
const {message}=require('../Controllers/message');
const router=express.Router();
router.get("/:id",message);
module.exports=router;