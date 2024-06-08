const mongoose=require('mongoose');

const mongoURI="mongodb://localhost:27017/news";
//const connectToMongo=()=>mongoose.connect(mongoURI).then(()=>console.log("Mongo Connected")).catch((err)=>console.log(err));
const connectToMongo=mongoose.connect(mongoURI).then(()=>console.log("Mongo Connected")).catch((err)=>console.log("mongo not connected"));


//mongodb://localhost:27017/guvi-react

console.log("Displaying file db");
//cls
//const connectToMongo =()=> mongoose.connect(mongoURI).then(()=>console.log("Mongo Connected")).catch((err)=>console.log(err));
module.exports.connectToMongo;
//mongodb://localhost:27017/guvi-react