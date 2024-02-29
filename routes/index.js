var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index route");
});



//ROUTE: Registering user
router.post("/register", (req, res, next)=>{

})

//ROUTE: Login user
router.post("/login", (req, res, next)=>{

})

//ROUTE: Retrieve user'profile
router.get("/user", (req, res, next)=>{

})






module.exports = router;
