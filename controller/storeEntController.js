var express = require('express');
var app = express();
const db = require('../models');
const { nanoid } = require("nanoid/non-secure");
const StoreEnt = db.StoreEnt;
const User = db.User;
const { Op } = require("sequelize");

exports.createStoreEnt = async (req, res) => {
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

  let seid = nanoid() + req.user.usernumber;




  const storeEnt = await StoreEnt.create({
    seid: seid,
    usernumber: req.user.usernumber,
    store_name: req.body.store_name,
    store_number: req.body.store_number,
    email: req.body.email,
    logo: req.body.logo,
    photos: req.body.photos,
    card_name: req.body.card_name,
    account_details: req.body.account_details,
    division: req.body.division,
    district: req.body.district,
    upazilla: req.body.upazilla,
    address_details: req.body.address_details,
    nid: req.body.nid,
    mobile_bank: req.body.mobile_bank,
    account_no: req.body.account_no,
  });
  res.status(201);
  res.json(
    {
      message: "Entepreneur store created successfully!"
    }
  );
};

exports.readStoreEntPending = async (req, res) => {
  if (req.model.role != 'admin') {
    res.status(403);
    res.json({
      message: "Forbidden Role"

    })

    return;
  }
  const storeEnt = await StoreEnt.findAll({
    where: {
      approved: null,
    }
  });
  if (storeEnt) {
    res.status(200);
    res.json(storeEnt);
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

exports.readStoreEntApproved = async (req, res) => {
  if (req.model.role != 'admin') {
    if (req.model.role != 'centerowner') {
      res.status(403);
      res.json({
        message: "Forbidden Role"

      })

      return;
    }
  }
  const storeEnt = await StoreEnt.findAll({
    where: {
      approved: 'yes',
    }
  });
  if (storeEnt) {
    res.status(200);
    res.json(storeEnt);
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};
exports.readStoreEntbySeid = async (req, res) => {
  if (req.model.role != 'admin') {
    if (req.model.role != 'centerowner') {
      res.status(403);
      res.json({
        message: "Forbidden Role"

      })

      return;
    }
  }
  const storeEnt = await StoreEnt.findOne({
    where: {
      seid: req.params.seid,
      approved: 'yes',
    }
  });
  if (storeEnt) {
    res.status(200);
    res.json(storeEnt);
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

exports.updateStoreEntApprove = async (req, res) => {
  if (req.model.role != 'admin') {
    res.status(403);
    res.json({
      message: "Forbidden Role"

    })

    return;
  }
  const storeEnt = await StoreEnt.update({
    approved: req.body.approved


  }, {
    where: {
      seid: req.body.seid,

    }
  });
  console.log(storeEnt)
  console.log(req.params.approved)
  console.log(req.params.seid)
  if (storeEnt == 1) {
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