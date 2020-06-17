const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const userSchema = new Schema ({
    name: String,
    email: String,
    password: String,
    gender:  String,
      age:  String,
      country: String,
      study:  String,
      interests:  String,
      relationship: String,
      status: String,
      state: String
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
} 

module.exports = mongoose.model('users', userSchema);
