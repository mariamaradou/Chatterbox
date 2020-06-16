const express = require("express");
const bodyParser = require("body-parser");
const Chats = require("./../models/Chat");

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  

    Chats.find({}).then(chat => {
      res.json(chat);
  
  });
});

module.exports = router;