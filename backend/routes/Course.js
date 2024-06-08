const express = require("express");
const app=express()
const { body, validationResult } = require("express-validator");
const User = require("../models/Courses");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT_SECRET = "guvilearningportal$1567";
var jwt = require("jsonwebtoken");
const fetchuser = require("../middlewere/Fetchuser.js");
const Courses = require("../models/Courses");

router.post("/addData",
fetchuser,
[
  body("name", "Enter a valid Name").isLength({ min: 3 }),
  body("description", "Enter a valid description").isLength({ min: 3 }),
  //body("Language", "Enter a valid Language").isLength({ min: 3 }),
  body("image", "Enter a valid image").isLength({ min: 3 }),
  body("duration", "Enter a duration of course").isNumeric({ min: 1 }),
  body("price", "Enter a price of course").isNumeric(),
  body("rating", "Enter a rating of course").isNumeric(),
  body("numReviews", "Enter a number of reviews").isNumeric(),
  body("enrolledStudents", "Enter a duration of course").isNumeric(),
  body("category").optional(), // Make category optional
],





 async (req,res) =>{
 try{
    const {name, description, Language,image, category,duration, price, rating, enrolledStudents} = req.body;

    const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data =new Courses({
    name,
    image,
    description,
    Language,
    duration,
    price,
    rating,
    category,
    enrolledStudents,
    user:req.user.luser.id,
  });
  const saveData = await data.save();
  res.json(saveData); // Corrected from req.json to res.json
   
  
 }
 catch(error)
 {
   // category,
    //console.log(error);
    
    res.status(500).json({message:error.message});

 }
 }

);




router.get("/fetchAllCourses",fetchuser,async(req,res)=>{
  const data=await Courses.find();
  res.json(data);

});
router.get("/fetchAllCoursesAdmin",fetchuser,async(req,res)=>{
  const data=await Courses.find({user:req.user.luser.id});
  res.json(data);

});

router.delete(
  "/deleteCourse/:id", fetchuser,
  async(req,res)=>{
    try{
      let course =await Courses.findByIdAndDelete(req.params.id);
      if(!course)
      {
        res.status(404),send("NotFound")
      }
    course=await Courses.findByIdAndDelete(req.params.id)
    res.json(course);
    }
    catch (error)
    {
      console.log(error);
      res.status(500).json({message:error.message});
    }
    }
  
)

module.exports=router;