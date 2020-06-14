const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb+srv://MariaMaradou:Maria8132024@cluster0-jrach.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connect = mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

/*mongoose.connection.on('open', function(err, doc){
    console.log("connection established");

    mongoose.connection.db.collection('theprofiles', function(err, docs) {
        // Check for error
        if(err) return console.log(err);
        // Walk through the cursor
        docs.find().each(function(err, doc) {
            // Check for error
            if(err) return console.err(err);
            // Log document
            console.log(doc);
        })
    });
}); */
 
module.exports = connect;