if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Δηλώσεις για το passport
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');      // module κρυπτογράφησης
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
var db = 0;
//Βάση δεδομένων
const MongoClient = require('mongodb');

//Σύνδεση στη βάση δεδομένων
async function main(){
  /**
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://testing:QG63fPpscBjYVJpV@testing-bflte.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);
      db = client.db("users");

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}
main().catch(console.error);
async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};





const initializePassport = require('./passport-config')
initializePassport(
  passport,
  //email => users.find(user => user.email === email),
  //id => users.find(user => user.id === id)
  db.collection('users').find( { email: user.email } )
)

//const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //users.push({
      //id: Date.now().toString(),
      //name: req.body.name,
      //email: req.body.email,
      //password: hashedPassword
    //});
    db.collection('users').insertOne({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    console.log(db.users.find().pretty()); //////Μόνο για το testing
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next()
}

app.listen(3000);