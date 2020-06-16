const express = require("express");
const bodyParser = require("body-parser");

const userProfile = require("./../models/user");

const Route = express.Router();

Route.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  
   
   userProfile.find({}).then(prof => {
      res.json(prof);
    });

});

module.exports = Route;