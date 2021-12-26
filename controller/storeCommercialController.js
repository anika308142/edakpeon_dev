var express = require('express');
var app = express();

const db = require('../models');
const { nanoid } = require("nanoid/non-secure");
const StoreCommercial = db.StoreCommercial;
const User = db.User;
const { Op } = require("sequelize");

exports.createStoreCommercial = async (req, res) => {
  if (req.model.role != 'shopkeeper') {
    res.status(403);
    res.json({
      message: "Forbidden Role"

    })

    return;
  }
  if (!req.body.store_name || !req.body.store_number) {
    //  console.log(req.body.store_name)
    res.status(400);
    res.json({
      message: "Required fields must not be empty"

    })
    return;
  }

  let scid = nanoid() + req.user.usernumber;

  const storeCommercial = await StoreCommercial.create({
    scid: scid,
    usernumber: req.user.usernumber,
    store_name: req.body.store_name,
    store_number: req.body.store_number,
    email: req.body.email,
    logo: req.body.logo,
    trade_license: req.body.trade_license,
    tin: req.body.tin,
    photos: req.body.photos,
    card_name: req.body.card_name,
    account_details: req.body.account_details,
    division: req.body.division,
    district: req.body.district,
    upazilla: req.body.upazilla,
    address_details: req.body.address_details,
    bin: req.body.bin,
    nid: req.body.nid,
    mobile_bank: req.body.mobile_bank,
    account_no: req.body.account_no,
  });
  res.status(201);
  res.json(
    {
      message: "Commercial store created successfully!"
    }
  );
};

exports.readStoreCommercialPending = async (req, res) => {
  console.log("im here")
  if (req.model.role != 'admin') {
    res.status(403);
    res.json({
      message: "Forbidden Role"

    })

    return;
  }
  const storeCommercial = await StoreCommercial.findAll({
    where: {
      approved: null,
    }
  });
  if (storeCommercial) {
    res.status(200);
    res.json(storeCommercial);
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

exports.readStoreCommercialApproved = async (req, res) => {
  if (req.model.role != 'admin') {
    if (req.model.role != 'centerowner') {
      res.status(403);
      res.json({
        message: "Forbidden Role"

      })

      return;
    }
  }
  const storeCommercial = await StoreCommercial.findAll({
    where: {
      approved: 'yes',
    }
  });
  if (storeCommercial) {
    res.status(200);
    res.json(storeCommercial);
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};
exports.readStoreCommercialbyScid = async (req, res) => {
  if (req.model.role != 'admin') {
    if (req.model.role != 'centerowner') {
      res.status(403);
      res.json({
        message: "Forbidden Role"

      })

      return;
    }
  }
  const storeCommercial = await StoreCommercial.findOne({
    where: {
      scid: req.params.scid,
    }
  });
  if (storeCommercial) {
    res.status(200);
    res.json(storeCommercial);
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

exports.updateStoreCommercialApprove = async (req, res) => {
  if (req.model.role != 'admin') {
    res.status(403);
    res.json({
      message: "Forbidden Role"

    })

    return;
  }
  const storeCommercial = await StoreCommercial.update({
    approved: req.body.approved


  }, {
    where: {
      scid: req.body.scid,

    }
  });
  if (storeCommercial == 1) {
    res.status(200);
    res.json({ message: "Updated" });
  }
  else {
    res.status(403);
    res.json({ message: "Failed" });
  }

};

// exports.deletePost = async (req, res) => {

//   const posts = await Post.destroy({
//     where: {
//       pid: req.params.pid,
//       uid: req.user.uid,
//     }
//   });
//   if (posts == 1) { res.status(200);
//     res.json({ message: "Deleted" }); }
//   else { res.status(403);
//     res.json({ message: "Failed" }); }

// };