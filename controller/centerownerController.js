const db = require('../models');
const Centerowner = db.Centerowner;
var generateToken = require('../utils/generateToken');
let options = {};
var role = "centerowner";

exports.createUser = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.usernumber) {
    res.status(400);
    res.json({
      message: "Username or usernumber or password can not be empty!"
    });
    return;
  }
  const [users, created] = await Centerowner.findOrCreate({
    where: { usernumber: req.body.usernumber },
    defaults: {
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
  let users = await Centerowner.findOne({
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

exports.readCenterowners = async (req, res) => {
  if (req.model.role != 'admin') {
    res.status(403);
    res.json({
      message: "Forbidden Role"

    })

    return;
  }
  const centerowners = await Centerowner.findAll();
  if (centerowners) {
    res.status(200);
    res.json(centerowners)
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

exports.readCenterownerbyCoid = async (req, res) => {
  if (req.model.role != 'admin') {
    res.status(403);
    res.json({
      message: "Forbidden Role"

    })

    return;
  }
  const centerowners = await Centerowner.findOne({
    where: {
      coid: req.params.coid,
    }
  });
  if (centerowners) {
    res.status(200);
    res.json(centerowners)
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};