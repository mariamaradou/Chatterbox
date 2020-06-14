const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');
const User = require('../models/user');
const connect = require("../dbconnect");
router.get('/', isAuthenticated, (req, res, next) => {
    res.render('me');

    
     
});



router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/me', 
    failureRedirect: '/signup',
    passReqToCallback: true
    
}));

router.get('/me',isAuthenticated,  (req, res, next) => {
    
   
    res.render('index')
;})

router.post('/me', isAuthenticated, async (req, res) => {
    try {
     console.log("heeeere")
      //Θα αντικατασταθεί από την επόμενη εντολή
      req.user.age=req.body.age;
      req.user.country=req.body.country;
      req.user.gender=req.body.Gender;
      req.user.study=req.body.study;
      req.user.interests=req.body.interests;
      connect.then(db =>  {
       
        
       User.updateOne({'name' : req.user.name}, 
        { $set: {'age': req.user.age,'country': req.user.country, 'gender': req.user.gender, 'study': req.user.study,'interests': req.user.interests  } }, function(err, result) { 
          if(err) { throw err; } 
          
         
        
       
        }); 
      });
    
     
     
     
    console.log(req.user)
    
    
    res.redirect('/')
  
  } catch {
    res.redirect('/me')
  
      
     
    } 
  }) 

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/', 
    failureRedirect: '/signin',
    passReqToCallback: true   
}));

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/signin');
});
 




function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

module.exports = router;