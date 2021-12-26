const db = require('../models');
const { nanoid } = require("nanoid/non-secure");
const Shopkeeper = db.Shopkeeper;
db.sequelize.sync();
var generateToken = require('../utils/generateToken');
let options = {};
var role = 'shopkeeper'

exports.createUser = async (req, res) => {

  if (!req.body.username || !req.body.password || !req.body.usernumber) {
    res.status(400);
    res.json({
      message: "Username or usernumber or password can not be empty!"
    });
    return;
  }
  // let d=new Date();
  let pid = nanoid() + req.body.uid;
  //+d.toISOString();
  const [users, created] = await Shopkeeper.findOrCreate({
    where: { usernumber: req.body.usernumber },
    defaults: {
      skid: pid,
      username: req.body.username,
      usernumber: req.body.usernumber,
      password: req.body.password,
      email: req.body.email
    }
  });
  if (created) {
    const token = await generateToken.generateAccessToken({ usernumber: req.body.usernumber });
    const type = await generateToken.generateRole({ role: role });

    // res.cookie('Authorization', token, [options]);
    res.header('Authorization', token);
    res.header('User-Role', type);
    res.status(201);
    //res.json({ message: "Registration Successful!" });
    res.json({
      username: users.username,
      role: role,
      email: users.email,
      phone_number: users.usernumber,
      access_token: token,
    });
  }

  else {
    res.header('Authorization', 'null')
    res.cookie('Authorization', 'null', [options])
    res.status(409);
    res.json({ message: "User already exists please login!" });
  }
};
exports.loginUser = async (req, res) => {
  if (!req.body.usernumber || !req.body.password) {
    res.status(400);
    res.json({
      message: "Usernumber or password can not be empty!"
    });
    return;
  }
  let users = await Shopkeeper.findOne({
    where: {
      usernumber: req.body.usernumber,
      password: req.body.password
    }
  });
  if (users == null) {
    res.cookie('Authorization', 'null', [options]);
    res.header('Authorization', 'null')
    res.status(404);
    res.json({
      message: "User ID or Password is incorrect!"
    });
  }
  else {
    const token = await generateToken.generateAccessToken({ usernumber: req.body.usernumber });
    const type = await generateToken.generateRole({ role: role });
    res.header('Authorization', token);
    res.header('User-Role', type);
    res.status(200);
    // res.json({
    //   message: "Log in successful!"
    // });
    res.json({
      username: users.username,
      role: role,
      email: users.email,
      phone_number: users.usernumber,
      access_token: token,
    });
  }
};
//readStoreCommercial
exports.readShopkeepers = async (req, res) => {
  console.log(req.model.role);
  if (req.model.role != 'admin') {
    if (req.model.role != 'centerowner') {
      
      console.log(req.model.role);
      res.status(403);
      res.json({
        message: "Forbidden Role?",
        role: req.model.role,
      })

      return;
    }
  }
  const shopkeepers = await Shopkeeper.findAll();
  if (shopkeepers) {
    res.status(200);
    res.json(shopkeepers)
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

exports.readShopkeeperbySkid = async (req, res) => {
  if (req.model.role != 'admin') {
    if (req.model.role != 'centerowner') {
      if (req.model.role != 'shopkeeper') {
        console.log(req.model.role);
        res.status(403);
        res.json({
          message: "Forbidden Role?",
          role: req.model.role,
        })

        return;
      }
    }
  }
  const shopkeepers = await Shopkeeper.findOne({
    where: {
      skid: req.params.skid,
    }
  });
  if (shopkeepers) {
    res.status(200);
    res.json(shopkeepers)
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};