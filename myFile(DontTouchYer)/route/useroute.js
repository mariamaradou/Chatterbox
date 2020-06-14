const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const userProfile = require("./../models/user");

const Route = express.Router();

Route.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  
  

  connectdb.then(db => {
   
   userProfile.find({}).then(prof => {
      res.json(prof);
    });
  });
});

module.exports = Route;