const express=require('express');
const router=express.Router();
const {signin,signup,changePassword,update,signupKorisnik,getMajstors,getProfile,getInfo}=require("../Controllers/majstor")
const {storage}=require("../storage");
const {isKorisnik,isLoggedIn}=require("../Middleware/checkAuth");
router.post("/signup",signupKorisnik);
router.post("/signin",signin("korisnik"));
router.put("/",isLoggedIn,storage.single("image"),update);
router.get("/",isLoggedIn,getMajstors);
router.get("/profile",isLoggedIn,getProfile);
router.get("/:id",getInfo);
module.exports=router;