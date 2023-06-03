const express = require("express");
const { sendResponse } = require("../Helper/Helper");
const route = express.Router();
const InstModel = require('../models/instituteModel')

route.get('/', async (req, res) => {
    // res.send("Get All Institute Data");

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;

    
    const result = await InstModel.find().skip(skip).limit(limit);
    try {
        if (!result) {
            res.send(sendResponse(false, null, "institute name is required"));
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (err) {
        res.send(sendResponse(400, null, err.message, err))
    }

});
route.get('/:id', async (req, res) => {
    // res.send("Get Institute Data by Id ");

    try {
        const id = req.params.id;
        const result = await InstModel.findById(id);
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

    const { instName, address, shortName, tel } = req.body

    try {
        let errArr = [];

        if (!instName) {
            errArr.push("Required : Name");
        }
        if (!address) {
            errArr.push("Required : Address");
        }
        if (!shortName) {
            errArr.push("Required : Short Name");
        }
        if (!tel) {
            errArr.push("Required : tel");
        }
        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        }
        else {
            let obj = { instName, address, shortName, tel };
            let institute = new InstModel(obj);
            await institute.save();
            if (!institute) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            } else {
                res.send(sendResponse(true, institute, "Saved successfully")).status(200);

            }
        }
    } catch (err) {
        console.log(err);

        if (err.length > 0) {
            res.send(sendResponse(true, institute, "Internal server error")).status(400);

        }
    }

});
route.put('/:id', async (req, res) => {
    // res.send("Update Institute Data by Id ");
    try {

        const id = req.params.id;
        let findById = InstModel.findById(id);

        if (!findById) {
            res.send(sendResponse(false, null, 'No Data Found')).status(404);
        }
        else {
            let updateInstituteById = await InstModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updateInstituteById) {
                res.send(sendResponse(false, null, 'Error')).status(400);
            }
            else {
                res.send(sendResponse(true, updateInstituteById, "Institute updated successfully")).status(200);
            }

        }

    } catch (error) {
        res.send(sendResponse(false, null, error)).status(400);
    }

});
route.delete('/:id', async(req, res) => {
    // res.send("Delete Institute Data ");

    try {
        let id = req.params.id;

        let findById = await InstModel.findById(id);

        if (!findById) {
            res.send(sendResponse(false, null, 'No Data Found On This Id')).status(404);
        } else {

            let deleteResult = await InstModel.findByIdAndDelete(id);
            if (!deleteResult) {
                res.send(sendResponse(false, null, 'Error')).status(400);
            }
            else {
                res.send(sendResponse(true, deleteResult, "Institute Successfully Deleted")).status(200);
            }
        }

    } catch (error) {
        res.send(sendResponse(false, null, 'Error No Data Found')).status(404);

    }
});


module.exports = route;