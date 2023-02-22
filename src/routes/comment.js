var route = require("express").Router({mergeParams:true}),
Comment = require("../models/comments")
Campground = require("../models/campgrounds")
var middlwareOBJ = require("../../middleware")

//COMMENTS
route.get('/campgrounds/:id/comments/new',middlwareOBJ.isLoggedIn,(req, res)=>{
    Campground.findById(req.params.id,(err, campground)=>{
        if(err){
            return console.log('ERROR: ' + err)
        }
        res.render("comment/new",{campground:campground})
    })

})

route.post("/campgrounds/:id/comments",middlwareOBJ.isLoggedIn,(req, res)=>{
    Campground.findById(req.params.id,(err, campground)=>{
        if(err){
            return console.log('ERROR: '+ err)
        }
        var newComment = req.body.comment


        Comment.create(newComment, (err, comment)=>{
            if(err){
                console.log('ERROR: '+ err)
            }
            comment.author.id = req.user.id
            comment.author.username = req.user.username
            comment.save()
            campground.comments.push(comment)
            campground.save()
            res.redirect("/campgrounds/"+req.params.id)
        })
    })
})


route.delete("/campgrounds/:id/comments/:comment_id",middlwareOBJ.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
        if(err){
            console.log('ERROR: '+err)
        }else{
            Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
                if(err){
                    return console.log('ERROR: '+err)
                }
                res.redirect("/campgrounds/"+req.params.id)
            })
        }
    })

})

module.exports = route