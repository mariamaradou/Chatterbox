const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb+srv://MariaMaradou:Maria8132024@cluster0-jrach.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;