var mongoose = require("mongoose")
var mongooseStrategy = require("passport-local-mongoose")

var userSchema = mongoose.Schema({
    username:{type:String},
    password:{type:String}
})
 userSchema.plugin(mongooseStrategy)
module.exports = mongoose.model("user",userSchema)