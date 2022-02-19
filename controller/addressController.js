var express = require('express');
var app = express();
const db = require('../models');
const Address = db.Address;
const { Op, Error } = require("sequelize");
const roles = require('../utils/roles');
const deliveryStatus = require('../utils/deliveryStatus');
const { nanoid } = require('nanoid/non-secure');

let roleUser = roles.USER;
exports.createAddress = async (req, res) => {
    console.log("-----------------------------------")
    console.log("createAddress")
    if (req.model.role != roleUser) {
        console.log(req.model.role)
        res.status(403);
        res.json({
            message: "Forbidden Role"
        })
        return;
    }

    if (!req.body.phone || !req.body.details) {
        res.status(400);
        res.json({
            message: "Required fields must not be empty"

        })
        return;
    }
    var usernumber = req.user.usernumber;
    const address = await Address.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        division: req.body.division,
        district: req.body.district,
        upazilla: req.body.upazilla,
        details: req.body.details,
        default: req.body.default,
        usernumber: usernumber,
    });
    if (!address) { throw new Error }
    res.status(201);
    res.json(
        {   
            message: "Added to Address successfully!",
            data:address
        }
    );
};


// exports.readAddress = async (req, res) => {
//     let status=deliveryStatus.ACTIVE
//     let usernumber=req.user.usernumber
//     const Address = await Address.findAll({
//         where: {
//             usernumber: usernumber,
//             status: status
//         }
//     });
//     if (Address) {
//         res.status(200);
//         res.json(Address)
//     }
//     else {
//         res.status(404);
//         res.json({
//             message: "Not found!"

//         });
//     }
// };
// exports.readAddressbyAddressId = async (req, res) => {
//     console.log(req.param.Address_id)
//     const Address = await Address.findAll({
//         where: {
//             Address_id:req.params.Address_id
//         }
//     });
//     if (Address) {
//         res.status(200);
//         res.json(Address)
//     }
//     else {
//         res.status(404);
//         res.json({
//             message: "Not found!"

//         });
//     }
// };


// async function readAddressbyStatus(status, usernumber) {
//     const Address = await Address.findOne({
//         where: {
//             usernumber: usernumber,
//             status: status
//         }
//     });
//     return Address

// }