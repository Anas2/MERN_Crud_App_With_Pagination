const express = require('express');
const app = express();
const StudentRouter = require('./routes/studentRouter');
const TeacherRoter = require('./routes/teacherRouter');
const InstituteRouter = require('./routes/instituteRouter');
const courseRouter = require('./routes/courseRoute');
require("dotenv").config();
const cors = require("cors");


const mongoose = require('mongoose')

// app.get('/',(req,res)=>{
//     res.send("Get Request");
// })

app.use(express.json());
app.use(cors());

app.use('/api/students',StudentRouter);
app.use('/api/teacher',TeacherRoter);
app.use('/api/institute',InstituteRouter);
app.use('/api/course',courseRouter);




// app.listen(5000,()=>{
//     console.log("server is listen on 5000");
// })


mongoose.connect(process.env.MONGO_URI).then((res)=>{
    app.listen(process.env.PORT,()=>{
        console.log("Database connected successfully & server is listen on 5000...");
});

}).catch((err)=>{
console.log(err);
})