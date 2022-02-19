var express = require('express');
var app = express();
const db = require('../models');
const Order = db.Order;
const { Op, Error } = require("sequelize");
const roles = require('../utils/roles');
const deliveryStatus = require('../utils/deliveryStatus');
const orderStatus = require('../utils/orderStatus');
const { updateCartStatus } = require('./cartController');

exports.createOrder = async (req, res) => {
    console.log("-----------------------------------")
    console.log("createOrder")
    let roleUser = roles.USER
    if (req.model.role != roleUser) {
        console.log(req.model.role)
        res.status(403);
        res.json({
            message: "Forbidden Role"
        })
        return;
    }

    if (!req.body.cart_id || !req.body.address_id) {
        res.status(400);
        res.json({
            message: "Required fields must not be empty"

        })
        return;
    }
    var usernumber = req.user.usernumber;
    var status = orderStatus.ORDERED

    const order = await Order.create({
        cart_id: req.body.cart_id,
        address_id: req.body.address_id,
        order_status: status,
        usernumber: usernumber,
    });
    if (!order) { throw new Error }
    let result = await updateCartStatus(status, req.body.cart_id)
    if (!result) { throw new Error }
    res.status(201);
    res.json(
        {
            message: "Order placed successfully!",
            data: order
        }
    );
};


exports.readOrderByUser = async (req, res) => {
    let roleUser = roles.USER
    if (req.model.role != roleUser) {
        console.log(req.model.role)
        res.status(403);
        res.json({
            message: "Forbidden Role"
        })
        return;
    }

    const orders = await readOrderByUserService(req.user.usernumber)
    if (!orders) {
        res.status(404);
        res.json({
            message: "Not found!"

        });
    }

    res.status(200);
    res.json(orders)

};

exports.readOrderByStatus = async (req, res) => {
    let roleUser = roles.USER
    if (req.model.role != roleUser) {
        console.log(req.model.role)
        res.status(403);
        res.json({
            message: "Forbidden Role"
        })
        return;
    }
    console.log(req.body.order_status)
    if (!req.body.order_status) {
        res.status(400);
        res.json({
            message: "Required fields must not be empty"

        })
        return;
    }
    let status=req.body.order_status
    let usernumber=req.user.usernumber
    const orders = await readOrderByStatusService(status,usernumber)
    if (!orders) {
        res.status(404);
        res.json({
            message: "Not found!"

        });
    }

    res.status(200);
    res.json(orders)

};
exports.updateOrderStatus = async (req, res) => {
    let roleUser = roles.USER
    if (req.model.role != roleUser) {
        console.log(req.model.role)
        res.status(403);
        res.json({
            message: "Forbidden Role"
        })
        return;
    }
   
    if (!req.body.order_id||!req.body.order_status) {
        res.status(400);
        res.json({
            message: "Required fields must not be empty"

        })
        return;
    }
    let orderId=req.body.order_id
    let orderStatus=req.body.order_status
   
    const orders = await updateOrderStatusService(orderId,orderStatus)
    if (!orders) {
        res.status(404);
        res.json({
            message: "Not found!"

        });
    }

    res.status(200);
    res.json(orders)

};
async function readOrderByUserService(usernumber) {
    const orders = await Order.findAll({
        where: {
            usernumber: usernumber
        }
    });
    return orders
}

async function readOrderByStatusService(status,usernumber) {
    const orders = await Order.findAll({
        where: {
            usernumber: usernumber,
            order_status:status
        }
    });
    return orders
}

async function updateOrderStatusService(order_id,status){
    const order = await Order.update({
        order_status: status
    }, {
        where: {
            id:order_id,

        }
    });
    return order;
}