const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const onlineUsers = require("./../models/online");

const Router = express.Router();

Router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  
  

  connectdb.then(db => {
   
   onlineUsers.find({}).then(online => {
      res.json(online);
    });
  });
});

module.exports = Router;
