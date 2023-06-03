const express = require('express');
const route = express.Router();
const courseModel = require('../models/courseModel');
const { sendResponse } = require('../Helper/Helper');

route.get('/', async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;

    
    const result = await courseModel.find().skip(skip).limit(limit);
    try {

        if (!result) {
            res.send(sendResponse(false, null, "no data found")).status(404)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (error) {
        res.send(sendResponse(false, null, "Internal server error")).status(400);
    }
})

route.get('/:id', async (req, res) => {
    // res.send(sendResponse(false, null)).status(200)
    try {
        let id = req.params.id;
        let findCourseById = await courseModel.findById(id);
        if (!findCourseById) {
            res.send(sendResponse(false, null, 'Data Not Found')).status(404)
        }
        else {
            res.send(sendResponse(true, findCourseById)).status(200)
        }
    } catch (error) {
        res.send(sendResponse(false, null, 'Internal server error')).status(404)

    }
});

route.post('/', async (req, res) => {
    const { cname, duration, fees, shortName } = req.body;
    try {
        let errArr = [];

        if (!cname) {
            errArr.push("Required : name");
        }
        if (!duration) {
            errArr.push("Required : duration");
        }
        if (!fees) {
            errArr.push("Required : fees");
        }
        if (!shortName) {
            errArr.push("Required : short name");
        }
        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        }
        else {
            const obj = { cname, duration, fees, shortName };
            const course = new courseModel(obj);

            if (!course) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            } else {
                await course.save();
                res.send(sendResponse(true, course, "Saved successfully")).status(200);

            }
        }
    } catch (error) {
        res.send(sendResponse(false, null, "Internal Server Error", error)).send(400);
    }
})

route.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let findById =  courseModel.findById(id);
        if (!findById) {
            res.send(sendResponse(false, null, 'Data Not Found On This Id')).status(404);
        } 
        else {
            let updateCourseByIdAnd = await courseModel.findByIdAndUpdate(id,req.body,{
                new: true,
            });
            if (!updateCourseByIdAnd) {
                res.send(sendResponse(false, null, 'Data Not Found...')).status(404);
            }
            else {
                res.send(sendResponse(true, updateCourseByIdAnd, 'Successfully Updated...')).status(200); I
            }
        }
    } catch (error) {
        res.send(sendResponse(false, null, 'Internal Server Error')).status(500);

    }
})

route.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let findById = await courseModel.findById(id);
        if (!findById) {
            res.send(sendResponse(false, null, 'Data Not Found On This Id'));
        } else {
            let findByIdAndDel = await courseModel.findByIdAndDelete(id);
            if (!findByIdAndDel) {
                res.send(sendResponse(false, null, 'Data Not Found....')).status(200)
            } else {
                res.send(sendResponse(true, findByIdAndDel, 'Data Deleted Successfully..')).status(200)
            }
        }
    } catch (error) {
        res.send(sendResponse(false, null, 'Internal server error')).status(500);
    }
})

module.exports = route;