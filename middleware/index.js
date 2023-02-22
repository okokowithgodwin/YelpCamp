var Campground = require("../src/models/campgrounds")
var Comment     = require("../src/models/comments")
const { route } = require("../src/routes")



var middlwareOBJ =[]


middlwareOBJ.isLoggedIn = function (req, res, next){    
    if(req.isAuthenticated()){
        return next()
    }
        req.flash("error","Please Login First")
        res.redirect("/login")
    }
    
middlwareOBJ.checkCampgroundOwnership = function (req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, (err, campground)=>{
                if(err){
                    req.flash("error", "Campground Not Found")
                    res.redirect("back")
                }else{
                    if(campground.author.id.equals(req.user.id)){
                        return next()
                    }else{
                        console.log('PERMISSION DENIED')
                    }
                }
            })
        }
    }
    
middlwareOBJ.checkCommentOwnership = function checkCommentOwnership (req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,(err, comment)=>{
                if(err){
                    return console.log('ERROR: '+err)
                }
                if(comment.author.id.equals(req.user.id)){
                    next()
                }else{
                    res.redirect("back")
                }
            })
        }
    
    }
    

    module.exports = middlwareOBJ