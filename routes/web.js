const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/login", (req, res)=>{
    if(req.session.user)
        return res.redirect("/dashboard");
    res.render("login", {error: null});
});

router.post("/login",async(req, res)=>{
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user || !(await user.comparePassword(password))){
            return res.sender("login", {error:"Invalid credentials"});
        }
        req.session.user = { id: user._id, username: user.username};
        res.redirect("/dashboard");
    }
    catch (err){
        res.render("login", {error:"Server error "});
    }
});

router.get("/logout", (req, res)=>{
    req.session.destroy(()=> res.redirect("/login"));
});

function isAuthenticated(req, res, next){
    if(req.session.user)
        return next();
    res.redirect("/login");
}

router.get("/dashboard", isAuthenticated, async(req, res)=>{
    const students = await Student.find();
    const teachers = await Teacher.find();
    const courses = await Course.find();
    const schools = await School.find();
    const levels = await Level.find();

    res.render("dashboard", {

    user: req.session.user,
    students,
    teachers,
    courses,
    schools,
    levels
  });
});

module.exports = router;