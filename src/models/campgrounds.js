var mongoose = require("mongoose")

var campgroundSchema = mongoose.Schema({
    name:{type:String},
    image:{type:String},
    description:{type:String},
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:"comment"}],
    author:{id:{type:mongoose.Schema.Types.ObjectId, ref:'user'}, username:{type:String}}
})

module.exports = mongoose.model("campgrounds", campgroundSchema)