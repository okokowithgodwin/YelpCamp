var express                     = require("express"),
    indexRoutes                 = require("./routes"),
    CampgroundRoutes            = require("./routes/campground"),
    CommentRoutes               = require("./routes/comment"),
    db                          = require("./db/db"),
    bodyParser                  = require("body-parser"),
    seedDB                      = require("./seed"),
    flash                       = require("connect-flash")
    app                         = express()

        //MIDDLEWARE
        app.use(require("express-session")({
            secret:"KEEP PRACTISING",
            resave:false,
            saveUninitialized:false
        }))

        app.use(flash())

        
        app.use(express.static("public"))
        app.use(indexRoutes)
        app.use(CampgroundRoutes)
        app.use(CommentRoutes)
        
        app.set("view engine", "ejs")
        app.use(bodyParser.urlencoded({extended:true}))

        //seedDB()
    app.listen(3000, ()=>{
        console.log("SERVING ORIGINAL YELPCAMP APP  ")
    })