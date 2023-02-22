const passport = require("passport")
const middlwareOBJ = require("../../middleware")

var route                       = require("express").Router(),
    Campground                  = require("../models/campgrounds"),
    Comment                     = require("../models/comments"),
    User                        = require("../models/userModel")
    bodyParser                  = require("body-parser"),
    methodOverride              = require("method-override"),
    localStrategy               = require("passport-local")



route.use(passport.initialize())
route.use(passport.session())
route.use(bodyParser.urlencoded({extended:true}))

passport.deserializeUser(User.deserializeUser())
passport.serializeUser(User.serializeUser())
passport.use(new localStrategy(User.authenticate()))

route.use(methodOverride("_method"))
route.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.error        = req.flash("error")
    res.locals.success      = req.flash("success")
    next()
})

//USER ROUTES

route.get("/register",(req, res)=>{
    res.render("user/register")
})

route.post("/register",(req, res)=>{
    var newUser = new User({username:req.body.username})
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log('ERROR POST USER: '+ err)
            
            req.flash("error",err.message)
            return res.redirect("back")
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success","Welcome to Yelcamp " + user.username)
            res.redirect("/campgrounds")
        })
        
    })
})

route.get("/login",(req, res)=>{
    res.render("user/login", {message:req.flash("error")})
})

route.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),(req, res)=>{

})

route.get("/logout",(req, res)=>{
    req.logOut((err)=>{
        if(err){
            console.log("ERROR LOGING OUT")
        }else{
            req.flash("success","Logged You Out")
            res.redirect("/campgrounds")
        }
    })
})

module.exports=route