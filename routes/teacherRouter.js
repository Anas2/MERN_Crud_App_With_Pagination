const express = require("express");
const route = express.Router();
const teacherModel = require('../models/teacherModel');
const { sendResponse } = require("../Helper/Helper");

route.get('/', async (req, res) => {
    // res.send("Get All Teacher Data");

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;

    const result = await teacherModel.find().skip(skip).limit(limit);
    try {
        if (!result) {
            res.send(sendResponse(false, null, 'no data found')).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    } catch (error) {
        res.send(sendResponse(false, null, 'internal server error')).status(400);
    }
});
route.get('/:id', async(req, res) => {
    // res.send("Get Teacher Data by Id ");
    try {
        const id = req.params.id;
        const result = await teacherModel.findById(id);
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
    const { tname, course, contact } = req.body

    try {
        let errArr = [];

        if (!tname) {
            errArr.push("Required : Name");
        }
        if (!course) {
            errArr.push("Required : Course");
        }
        if (!contact) {
            errArr.push("Required : Contact");
        }
        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        }
        else {
            let obj = { tname, course, contact };
            let teacher = new teacherModel(obj);
            await teacher.save();
            if (!teacher) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            } else {
                res.send(sendResponse(true, teacher, "Saved successfully")).status(200);

            }
        }
    } catch (err) {
        console.log(err);

        if (err.length > 0) {
            res.send(sendResponse(true, teacher, "Internal server error")).status(400);

        }
    }

});
route.put('/:id', async (req, res) => {
    // res.send("Update Teacher Data by Id ");
    try {
        let id = req.params.id;
        let findById = teacherModel.findById(id);
        if (!findById) {
            res.send(sendResponse(false, null, 'Data Not Found On tHis Id')).status(404);
        }
        else {
            let updateTeacherById = await teacherModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updateTeacherById) {
                res.send(sendResponse(false, null, 'Data not found')).status(404);
            }
            else {
                res.send(sendResponse(true, updateTeacherById, 'Data Updated Successfully')).status(200);

            }
        }
    } catch (error) {

    }

});
route.delete('/:id', async(req, res) => {
    // res.send("Delete Teacher Data ");
    try {
        let id = req.params.id;

        let findById = await teacherModel.findById(id);

        if (!findById) {
            res.send(sendResponse(false, null, 'No Data Found On This Id')).status(404);
        } else {

            let deleteResult = await teacherModel.findByIdAndDelete(id);
            if (!deleteResult) {
                res.send(sendResponse(false, null, 'Error')).status(400);
            }
            else {
                res.send(sendResponse(true, deleteResult, "Teacher Successfully Deleted")).status(200);
            }
        }

    } catch (error) {
        res.send(sendResponse(false, null, 'Error No Data Found')).status(404);

    }

});


module.exports = route;