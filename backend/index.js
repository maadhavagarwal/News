const connectToMongo=require("./db");
connectToMongo;

const express=require("express");
const app=express();
//const port =5000;
var cors=require("cors");
app.use(cors());
app.use(express.json())
console.log("first");
//api routing
app.use("/api/auth",require("./routes/Auth"))

app.use("/api/add",require("./routes/Course"))
app.use("/api/course/",require("./routes/Enrollment"))

//router.post("/api/auth",require("./routes/Auth"))
//
//app.use("api/auth",require("./routes/Auth"));
app.listen(5000, () => console.log("serverstarterd at port 5000"));
