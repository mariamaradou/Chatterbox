const mongoose = require('mongoose');
const { mongodb } = require('./url');

mongoose.connect(mongodb.URI, {useNewUrlParser: true})
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err))