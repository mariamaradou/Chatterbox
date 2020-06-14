const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

//elegxos sto SIGN UP
passport.use('local-signup', new LocalStrategy({
    
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({email: email});
  const username=await User.findOne({name: req.body.name});

  //elegxos an yparxei mail sth bash
    if(user) {
        return done(null, false, req.flash('signupMessage', 'The email is already taken'));
    
    }

    //elegxos an yparxei to onoma sth bash
    else if(username) {
        return done(null, false, req.flash('signupMessage', 'The name is already taken'));
    
    }
     else {
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.gender = "";
        newUser.age = "";
        newUser.country = "";
        newUser.study = "";
        newUser.interests = "";
        newUser.status="";
        newUser.state="online";
        await newUser.save();
        done(null, newUser);
    }
}));

//elegxos sto SIGN IN
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true    
}, async (req, email, password, done) => {
    
    const user = await User.findOne({email:email});
    if(!user) {
        return done(null, false, req.flash('signinMessage', 'The user does not exist'));
    }
    if(!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    done(null, user);
}));