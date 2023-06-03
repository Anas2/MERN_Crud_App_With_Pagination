const express = require("express");
const route = express.Router();
const StdModel = require('../models/studentModel');
const { sendResponse } = require("../Helper/Helper")
const StudentDto = require('../dto/studentDto');

route.get('/', async (req, res) => {
    // res.send("Get All student Data");

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;


    console.log("data","page==>",page,"skip==>",skip);

    const result = await StdModel.find().skip(skip).limit(limit);
    try {
        if (!result) {
            res.send(sendResponse(false, null, "no data found")).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    } catch (e) {
        console.log(e);
        res.send(sendResponse).status(400)
    }

});
route.get('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const result = await StdModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found On this Id")).status(404)

        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (error) {
        res.send(sendResponse(false, null, 'No Data Found')).status(404)

    }

});
route.post('/', async (req, res) => {
    // res.send("Post student Data ");
    const { fname, lname, contact, email, password } = req.body
    try {
        let errArr = [];

        if (!fname) {
            errArr.push("Required : First Name");
        }
        if (!lname) {
            errArr.push("Required : Last Name");
        }
        if (!contact) {
            errArr.push("Required : Contact");
        }
        if (!email) {
            errArr.push("Required : Email");
        }
        if (!password) {
            errArr.push("Required : Password");
        }

        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        }
        else {
            let obj = { fname, lname, contact, email, password };
            let student = new StdModel(obj);
            await student.save();
            if (!student) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            } else {

                const studentDto = new StudentDto(student)
                res.send(sendResponse(true, studentDto, "Saved successfully")).status(200);
            }
        }
    } catch (err) {
        console.log(err);

        if (err.length > 0) {
            res.send(sendResponse(true, student, "Internal server error")).status(400);

        }
    }

});
route.put('/:id', async (req, res) => {
    // res.send("Update student Data by Id ");

    try {

        const id = req.params.id;
        let findById = StdModel.findById(id);

        if (!findById) {
            res.send(sendResponse(false, null, 'No Data Found')).status(404);
        }
        else {
            let updateStudentById = await StdModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updateStudentById) {
                res.send(sendResponse(false, null, 'Error')).status(400);
            }
            else {
                const studentDto = new StudentDto(updateStudentById)
                res.send(sendResponse(true, studentDto, "student updated successfully")).status(200);
            }

        }

    } catch (error) {
        res.send(sendResponse(false, null, error)).status(400);
    }


});
route.delete('/:id', async (req, res) => {
    // res.send("Delete student Data ");

    try {
        let id = req.params.id;

        let findById = await StdModel.findById(id);

        if (!findById) {
            res.send(sendResponse(false, null, 'No Data Found On This Id')).status(404);
        } else {

            let deleteResult = await StdModel.findByIdAndDelete(id);
            if (!deleteResult) {
                res.send(sendResponse(false, null, 'Error')).status(400);
            }
            else {
                const studentDto = new StudentDto(deleteResult);
                res.send(sendResponse(true, studentDto, "Student Successfully Deleted")).status(200);
            }
        }

    } catch (error) {
        res.send(sendResponse(false, null, 'Error No Data Found')).status(404);

    }

});

// route.get('/',async(req,res)=>{
//     const page = req.query.page;
//     const limit = req.query.limit;
//     console.log(page,"==> page",limit,"===> limit");
// })


module.exports = route;