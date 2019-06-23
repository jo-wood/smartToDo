"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const addNewUser = require("./routes/checkRegister");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("../styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Register page
app.get("/register", (reg, res) => {
  res.render("register");
})

// Register post
app.post("/register", (req, res) => {
  let inputEmail = req.body.email;
  let inputPassword = req.body.password;

  //if email or password are empty
  if (!inputEmail) {
    res.status(400).send('Invalid email.'); 
  }
  if (!inputPassword) {
    res.status(400).send('Invalid password.'); 
  }
  //check if email already in db, then add if not
  knex
    .select('email', 'id')
    .from('users')
    .where('email', inputEmail)
    .then((result) => {
      if (result.length > 0){
        console.log('User exists already ', result);
        res.status(400).send('A user with this email already exists.')        
      } else {
        console.log('User can be registered');
        addNewUser(knex, inputEmail, inputPassword);
        res.status(200).send('Great you can be registered! Wish I could register you .')
      }      
    })
});


// Get main page
app.get("/my-list", (req, res) => {
  res.render("my-list");
});

// userInput
app.post("/my-list", (req, res) => {
  let userInput = req.body.userInput
  console.log(userInput);
  ;  
  res.render("my-list");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
