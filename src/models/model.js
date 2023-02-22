const mongoose = require("mongoose")
const schema = mongoose.Schema
const campgroundSchema = new schema({
    CampName:{type:String},
    CampImage:{type:String}
})

const Campground = mongoose.model('campground',campgroundSchema)
module.exports = Campground  