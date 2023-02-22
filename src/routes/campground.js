var Campground = require("../models/campgrounds")
var middlwareOBJ = require("../../middleware")
const route = require("express").Router()
// var campgrounds =   
//     {
//         name:"EVERETT",
//         image:"https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//         description:"Camping in Kentucky can be a blast. So if you dream of running a successful campsite for families to create memories, it will take some hard work. There are many factors to consider, including land maintenance, wildlife preservation, and infrastructure. And that’s only scratching the surface. It will be a costly venture, but the rewards"
//     }


route.get("/",(req, res)=>{
    console.log(req.user)
    res.render("index")
})

route.get("/campgrounds", (req, res)=>{
    Campground.find({},(err, campgrounds)=>{
        if(err){
            return console.log("ERROR CREATING CAMPGROUND: " + err)
        }
        res.render("campground/campgrounds", {campgrounds:campgrounds})
    })    
})

route.get("/campgrounds/new",middlwareOBJ.isLoggedIn,(req, res)=>{
    
    res.render("campground/new")
})
route.post("/campgrounds",middlwareOBJ.isLoggedIn, (req, res)=>{
    var newCampground = req.body.campground
    Campground.create(newCampground,(err, campground)=>{
        if(err){
            return console.log("ERROR POST CAMPGROUND: "+ err)
        }
        campground.author.id = req.user.id,
        campground.author.username = req.user.username
        campground.save()
        req.flash("success", campground.name + "Campground created successfully")
        res.redirect("/campgrounds")
        
    })
})

route.get("/campgrounds/:id",(req, res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err, campground)=>{
        if(err){
            return console.log("ERROR FINDBYID CAMPGROUND")
        }
        res.render("campground/show",{campground:campground})
    })
})

route.get("/campgrounds/:id/edit" ,middlwareOBJ.checkCampgroundOwnership, (req, res)=>{
    Campground.findById(req.params.id,(err, campground)=>{
        if(err){
            return console.log("ERROR FIND CAMP EDIT")
        }
        res.render("campground/edit",{campground:campground})
    })
})

route.put("/campgrounds/:id",middlwareOBJ.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,(err, campground)=>{
        if(err){
            return console.log("ERROR EDIT CAMPGROUND: "+ err)
        }
        req.flash("success", campground.name + "campground Edited Successfully")
        res.redirect("/campgrounds/"+req.params.id)
    })
})

route.delete("/campgrounds/:id",middlwareOBJ.checkCampgroundOwnership,(req, res)=>{
    Campground.findByIdAndDelete(req.params.id,(err)=>{
        if(err){
            return console.log("ERROR DELETE CAMPGROUND")
        }
        res.redirect("/campgrounds")
    })
})

module.exports = route