var express = require("express");
const ProfileValidation  = require("../validation/userValidation");
const Validation = require("../validation/userValidation");
const UserService = require("../service/userService");
const authenticateToken = require('../helpers/auth')
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {

  res.send("index route");
});



//ROUTE: Registering user
router.post("/register", async (req, res, next)=>{
   await new UserService().register(req, res, next)
})

//ROUTE: Login user
router.post("/login", async(req, res, next)=>{
 await new UserService().login(req, res, next)

})

//ROUTE: Retrieve user'profile
router.get("/profile", async (req, res, next)=>{
  
  // await authenticateToken(req, res, next)
  await new UserService().getProfile(req,res, next)

})

router.get('/logout', async (req, res, next)=>{
  await new UserService().logout(req,res, next)
})






module.exports = router;
