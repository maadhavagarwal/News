const express = require("express");
const app=express()
const { body, validationResult } = require("express-validator");
const Enroll = require("../models/Enroll");
const router = express.Router();
const fetchuser = require("../middlewere/Fetchuser.js");
const Courses = require("../models/Courses.js");
const { useReducer } = require("react");

router.post("/enroll/:id" ,
fetchuser,
[
    body("courseId", "Enter a valid Name").isLength({ min: 3 }),
    body("paymentId", "Enter a valid description").isLength({ min: 5 }),
    body("Address", "Enter a valid Name").isLength({ min: 3 }),
    body("Name", "Enter a valid Name").isLength({ min: 3 }),
  
],
async(req,res)=>{
    try{
        const {courseId,Name,paymentId,Address}= req.body;
        console.log(req.body)
        const errors =validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });

        }
        const data =new Enroll({
            user:req.user.luser.id,
            courseId,

            Name,
            paymentId,
            Address,
        })
        console.log (data);
        const  saveData=await data.save();
        res.json(saveData)
        console.log(saveData);
     
    
        
           // if ( userEnrollment ) {
             //   return res.status(400).json({ message: "Duplicate enrollment"});
           // }
            
            
         
         
        }
    catch(error)
    {
       res.status(500).json({message:error.message});

    }
}
);
router.get("/fetchAllEnrollment", fetchuser, async (req, res) => {
    try {
        // Fetch all enrollments for the authenticated user
        const userEnrollment = await Enroll.find({user:req.user.luser.id});
       // console.log(user );
        res.json(userEnrollment);
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/fetchAllEnrollmentAdmin", fetchuser, async (req, res) => {
    try {
        // Fetch admin courses
        const adminCourses = await Courses.find(/*{enroll:req.body._id }*/);
        
        // Fetch enrollments for the authenticated user
        const userEnrollments = await Enroll.find({ user: req.user.luser.id });
        
        // Find enrolled courses that match admin courses
        const enrolledCourses = userEnrollments.filter(enrollment => {
            return adminCourses.some(course => {
                return enrollment.courseId.toString() === course._id.toString();
            });
        });
    
        // If there are enrolled courses matching admin courses, return them
        if (enrolledCourses.length > 0) {
            return res.status(200).json(enrolledCourses);
        } else {
            return res.status(404).json({ message: "No matching enrollments found" });
        }
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
})
module.exports=router;