const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    sender: {
      type: String
    },
    img: {
       data: Buffer, contentType: String 
    },
    gender: {
      type: String
    },
    age: {
      type: String
    },
    country: {
      type: String
    },
    study: {
      type: String
    },
    interests: {
      type: String
    }
  },
  {
    timestamps: true
  }

 
);

let Chat = mongoose.model("theChat", chatSchema);

module.exports = Chat;

