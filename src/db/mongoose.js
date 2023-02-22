var mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/campDB",{
    useNewUrlParser:true
},()=>{
    console.log("CONNECTION SUCCESSFULL")
})
module.exports = mongoose
