const express=require('express');
const router=express.Router();
const post=require('../Models/post');
const {storage}=require('../storage');
const {isMajstor,isKorisnik}=require('../Middleware/checkAuth')
const {addPost,getPost,deletePost,updatePost,getPostById,getPostByFilter}=require('../Controllers/post')
router.post("/",isMajstor,storage.array("files"),addPost);
router.get("/",isMajstor,getPost);
router.put("/",isMajstor,storage.array("files"),updatePost);
router.get("/filter",isKorisnik,getPostByFilter);
router.get("/:id/",getPostById);
router.delete("/:id/",isMajstor,deletePost);
module.exports=router;