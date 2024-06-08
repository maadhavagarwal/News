const express = require("express");
const app=express()
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT_SECRET = "guvilearningportal$1567";
var jwt = require("jsonwebtoken");
const fetchuser = require("../middlewere/Fetchuser");

router.post("/createUser",

  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 3 }),
    body("mobile", "Enter a valid Name").isLength({ min: 10 }),
  ],

  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(errors)
    let useEmail = await User.findOne({ email: req.body.email });
    let useMobile = await User.findOne({ mobile: req.body.mobile });

    try {
      if (useEmail || useMobile) {
        return res.status(400).json({
          success: success,
          error: "Sorry, email or mobile number already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      hassPassword = await bcrypt.hash(req.body.password, salt);
      newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hassPassword,
        mobile: req.body.mobile,
        isAdmin:req.body.isAdmin
      });
      const data = {
        luser: {
          id: newUser._id,
          name: newUser.name,
          isAdmin:newUser.isAdmin
        },
      };
      let isAdmin=data.luser.isAdmin;
      let name = data.luser.name;
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ authToken, success, name,isAdmin });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message:error.message });
    }
  });
 // console.log(req.body);
 //login 
 router.post("/loginUser",
 [
  body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 3 }),
 ], async(req,res)=>{
    //let success=false;
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   const {email,password}=req.body;
   try{
    let user =await User.findOne({email})
    if(!user){
      return res
      .status(400)
      .json({error:"No user with this email"});
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res
      .status(400)
      .json({error:"wrong password"});

    }
    const payload = {
      luser: {
        id: user ? user._id : null,
        name: user ? user.name : null,
        isAdmin: user ? user.isAdmin : null
      }
    };
    
    if (!user || !user.id || !user.name) {
      return res.status(400).json({ error: "Invalid user data" });
    }
    
    
    const isAdmin = payload.luser.isAdmin;
    const name = payload.luser.name;
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({ authToken, success, name,isAdmin });
  }

catch (error) {
  console.log(error);
  res.status(500).json({ message:error.message });
}

});
router.get(
  "/getUser",
  fetchuser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.luser.id)
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server Error");
    }
  }
);

module.exports = router;
