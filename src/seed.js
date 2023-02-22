var Campground = require("./models/campgrounds"),
    Comment = require("./models/comments")
const comments = require("./models/comments")
var campgrounds = [
  
    {
        name:"EVERETT",
        image:"https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        description:"Camping in Kentucky can be a blast. So if you dream of running a successful campsite for families to create memories, it will take some hard work. There are many factors to consider, including land maintenance, wildlife preservation, and infrastructure. And that’s only scratching the surface. It will be a costly venture, but the rewards"
    },
    {
        name:"KILAROV ZANET",
        image:"https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        description:"Camping in Kentucky can be a blast. So if you dream of running a successful campsite for families to create memories, it will take some hard work. There are many factors to consider, including land maintenance, wildlife preservation, and infrastructure. And that’s only scratching the surface. It will be a costly venture, but the rewards"
    },
    {
         name:"LISBIN TOMM",
         image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
         description:"Camping in Kentucky can be a blast. So if you dream of running a successful campsite for families to create memories, it will take some hard work. There are many factors to consider, including land maintenance, wildlife preservation, and infrastructure. And that’s only scratching the surface. It will be a costly venture, but the rewards"
     },
    {
        name:"BLAKE WISK",
        image:"https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        description:"Camping in Kentucky can be a blast. So if you dream of running a successful campsite for families to create memories, it will take some hard work. There are many factors to consider, including land maintenance, wildlife preservation, and infrastructure. And that’s only scratching the surface. It will be a costly venture, but the rewards"
    }
]


function seedDB(){
Campground.remove({},(err)=>{
    if(err){
        return console.log('REMOVE CAMPGROUND ERROR SEEDdb')
    }
    console.log('REMOVED ALL CAMPGROUNDS')
    campgrounds.forEach((campground)=>{
        Campground.create(campground,(err, campground)=>{
            if(err){
                return console.log("ERROR CREATING CAMPGROUND IN SEEDDB")
            }
            console.log('CAMPGROUND CREATED')
            var newComment = {
                author:"OKOKO",
                text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius deserunt hic quam iusto dolor voluptatem rerum labore quasi, itaque ullam, praesentium enim nostrum ratione reprehenderit nisi mollitia delectus, voluptas iste! Neque nihil, placeat commodi inventore quis enim culpa doloremque magnam?"
            }
            Comment.create(newComment,(err, comment)=>{
                if(err){
                    return console.log("ERROR CREATING COMMENT SEEDDB: "+ err)
                }
                comment.save()
                campground.comments.push(comment)
                campground.save()
            })
        })
    })
})
}

module.exports = seedDB