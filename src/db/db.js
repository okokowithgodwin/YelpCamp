var mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/YC",{
    useNewUrlParser:true
},()=>{
    console.log("CONNECTION TO YELPCAMP DB SUCCCESSFUL")
})


module.exports = mongoose