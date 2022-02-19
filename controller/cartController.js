var express = require('express');
var app = express();
const db = require('../models');
const Cart = db.Cart;
const User = db.User;
const { Op, Error } = require("sequelize");
const roles = require('../utils/roles');
const deliveryStatus = require('../utils/deliveryStatus');
const { nanoid } = require('nanoid/non-secure');

let roleUser = roles.USER;
exports.createCart = async (req, res) => {
    console.log("-----------------------------------")
    console.log("createCart")
    if (req.model.role != roleUser) {
        console.log(req.model.role)
        res.status(403);
        res.json({
            message: "Forbidden Role"
        })
        return;
    }

    if (!req.body.pid || !req.body.quantity) {
        res.status(400);
        res.json({
            message: "Required fields must not be empty"

        })
        return;
    }
    var usernumber = req.user.usernumber;
    var status = deliveryStatus.ACTIVE
    let cart = await readCartbyStatus(status, usernumber)
    if (cart) {
        var cart_id = cart.cart_id
    }
    else {
        var cart_id = nanoid(8) + usernumber.slice(7, 11);
    }


    const cartItem = await Cart.create({
        cart_id: cart_id,
        pid: req.body.pid,
        variant_id: req.body.variant_id,
        quantity: req.body.quantity,
        status: status,
        usernumber: usernumber,
    });
    if (!cartItem) { throw new Error }
    res.status(201);
    res.json(
        {
            message: "Added to cart successfully!"
        }
    );
};


exports.readCart = async (req, res) => {
    let status = deliveryStatus.ACTIVE
    let usernumber = req.user.usernumber
    const cart = await Cart.findAll({
        where: {
            usernumber: usernumber,
            status: status
        }
    });
    if (cart) {
        res.status(200);
        res.json(cart)
    }
    else {
        res.status(404);
        res.json({
            message: "Not found!"

        });
    }
};
exports.readCartbyCartId = async (req, res) => {
    console.log(req.param.cart_id)
    const cart = await Cart.findAll({
        where: {
            cart_id: req.params.cart_id
        }
    });
    if (cart) {
        res.status(200);
        res.json(cart)
    }
    else {
        res.status(404);
        res.json({
            message: "Not found!"

        });
    }
};


async function readCartbyStatus(status, usernumber) {
    const cart = await Cart.findOne({
        where: {
            usernumber: usernumber,
            status: status
        }
    });
    return cart

}

exports.updateCartStatus = async (status, cartId) => {
    const cart = await Cart.update({
        status: status
    }, {
        where: {
            cart_id: cartId,

        }
    });
    return cart;
}
/*exports.updatePost = async (req, res) => {

  const posts = await Post.update({
    title: req.body.title,
    story: req.body.story

  }, {
    where: {
      pid: req.params.pid,
      uid: req.user.uid,
    }
  });
  if (posts == 1) { res.status(200);
    res.json({ message: "Updated" }); }
  else { res.status(403);
    res.json({ message: "Failed" }); }

};
*/
