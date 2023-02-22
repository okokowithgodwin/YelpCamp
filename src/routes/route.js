const router=require("express").Router()
const Campground = require("../models/model")
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({extended:true}))

router.get('/',(req, res)=>{
    res.render("home")
})



router.get('/campgrounds/new',(req, res)=>{
    res.render("newcg")
})

router.post('/campground/add', async(req, res)=>{
    newCG = req.body
    const campgrounds = new Campground(newCG)
    await campgrounds.save()
    res.redirect('/campgrounds')
})

router.get('/campgrounds', async(req, res)=>{
    var campground = await Campground.find()
    res.render('campgrounds',{campgrounds:campground})
})
module.exports=router