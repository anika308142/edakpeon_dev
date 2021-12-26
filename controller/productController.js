var express = require('express');
var app = express();
const db = require('../models');
const { nanoid } = require("nanoid/non-secure");
const Product = db.Product;
const User = db.User;
const { Op } = require("sequelize");
exports.createProduct = async (req, res) => {
  console.log("-----------------------------------")
  console.log(req.model.role)
  if (req.model.role != 'shopkeeper') {
    if (req.model.role != 'centerowner') {
      if (req.model.role != 'admin') {
        res.status(403);
        res.json({
          message: "Forbidden Role"

        })
        return;
      }
    }
  }
  if (!req.body.store_name || !req.body.product_name) {
    //  console.log(req.body.store_name)
    res.status(400);
    res.json({
      message: "Required fields must not be empty"

    })
    return;
  }
  var num = req.user.usernumber;
  var pid = nanoid() + num.slice(7, 11);


  const product = await Product.create({
    pid: pid,
    store_name: req.body.store_name,
    store_id: req.body.store_id,
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    category: req.body.category,
    subcategory: req.body.subcategory,
    sub_subcategory: req.body.subcategory,
    brand: req.body.brand,
    unit_type: req.body.unit_type,
    product_type: req.body.product_type,//10
    thumbnail: req.body.thumbnail,
    gallery: req.body.gallery,
    unit_price: req.body.unit_price,
    in_stock: req.body.in_stock,
    discount: req.body.discount,
    discount_type: req.body.discount_type,
    vat: req.body.vat,
    vat_type: req.body.vat_type,
    product_description: req.body.product_description,
    description_image: req.body.description_image,//20
    description_video: req.body.description_video,
    free_shipping: req.body.free_shipping,
    ship_in_dhaka: req.body.ship_in_dhaka,
    ship_out_dhaka: req.body.ship_out_dhaka,
    return_available: req.body.return_available,
    return_days: req.body.return_days,
    cod: req.body.cod,
    advance_payment: req.body.advance_payment,
    cod_payment: req.body.cod_payment,
    min_days: req.body.min_days,//30
    max_days: req.body.max_days,
    slug: req.body.slug,
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    meta_image: req.body.meta_image,
    usernumber: req.user.usernumber,//36
  });
  res.status(201);
  res.json(
    {
      message: "Product created successfully!"
    }
  );
};

exports.readProducts = async (req, res) => {
  const products = await Product.findAll();
  if (products) {
    res.status(200);
    res.json(products)
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

exports.readProductbyPid = async (req, res) => {
  const products = await Product.findOne({
    where: {
      pid: req.params.pid,
    }
  });
  if (products) {
    res.status(200);
    res.json(products)
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

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

exports.deletePost = async (req, res) => {

  const posts = await Post.destroy({
    where: {
      pid: req.params.pid,
      uid: req.user.uid,
    }
  });
  if (posts == 1) { res.status(200);
    res.json({ message: "Deleted" }); }
  else { res.status(403);
    res.json({ message: "Failed" }); }

};*/