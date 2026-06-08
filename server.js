// Call to the libraries
// Web server framework
const express = require("express");
var indexRouter = require('./Routes/index.js');
require("dotenv").config();
const { pool } = require("./Routes/dbCONFIG.js");
// Allow password encryptions
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();
// Allow table data fetching
const axios = require('axios');
const { JSDOM } = require('jsdom');
const PDFDocument = require('pdfkit');

// references environment variable when the port used in production mode, "" in development mode
const PORT = process.env.PORT || 4000;

const initializePassport = require("./Routes/passportCONFIG.js");

// pass the passport variable
initializePassport(passport);

const app = express();

// Middleware
// Ensure server can access static files in the Public folder
app.use("/Public", express.static("Public"));
app.use("/Routes", express.static("Routes"));

//Define all middleware with the function/method provided by express called express.static()
// Parses details from a form
app.set('views','views');
// Templating views engine engine
app.set("view engine", "ejs");
// handles extended url coded query strings
app.use(express.urlencoded({ extended: true }));
// So that json middleware can be used
app.use(express.json());

// define the key we want to keep secret, keep session secret
app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
app.use(passport.session());

// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(flash());


// Before routes are defined, handles static files in the public directory
app.use(express.static('public'));

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.use("/", indexRouter);

// Pass registration success validation to pages in view
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/esgmodules", ensureAuthenticated, (req, res) => {
  res.render("esgmodules");
});
 
app.get("/users/epadata", ensureAuthenticated, (req, res) => {
  res.render("epadata");
});

app.get("/users/form", (req, res) => {
  res.render("form");
});
app.get("/users/form2", (req, res) => {
  res.render("form2");
});

app.get("/users/form3", (req, res) => {
  res.render("form3");
});

app.get("/users/form4", (req, res) => {
  res.render("documentation");
});
app.get("/users/form5", (req, res) => {
  res.render("documentation");
});

app.get("/users/documentation", ensureAuthenticated, (req, res) => {
  res.render("documentation");
});

app.get("/users/runstatus", ensureAuthenticated, (req, res) => {
  res.render("runstatus");
});

app.get("/users/register", checkAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  console.log(req.session.flash.error);
  res.render("login.ejs");
});
 
app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user.name });
});

// app.get("/users/table1", ensureAuthenticated, (req, res) => {
//   res.render("table1");
// });


// User Logout
app.post("/users/logout", (req,res) => {
  req.logOut(function(err) {
    console.log("logged out pending........");  
    if (err) { return next(err); }
      req.flash("success_msg", "You have successfully logged out.");
      console.log("user logged out");
      res.redirect("/users/login");
  });
});


// Logs and validates user's input credentials into the database
app.post("/users/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  // Define parameters of the errors array
  // let variables can be updated but not re-declared within the same scope.
  // Unlike var, let declarations are not initialized as undefined and will throw 
  // a Reference Error if accessed before declaration, making the code more predictable.
  let errors = [];

  console.log({
    name,
    email,
    password,
    password2
  });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  // If errors occur print arror array
  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    // Form validation has passed

    // Use await for asynchronous function
    // Encrypt password with Bcyrpt 10 times
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        // If users are already in the database, redirect & display error
        if (results.rows.length > 0) {
          console.log("user already registered");
          // redirect to login page and display error
          res.render("login", { errors });
          // // Display redirect error on login page
          // errors.push({ message: "Email already registered" });
        } else {
          // Register the new user
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }

              // req.flash("success_msg", "You are now registered. Please log in");
              console.log("New User Added Successfully");
              console.log(results.rows);
              
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

 // redirect users to dashboard or login page depending on login success
app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })
);

// Authentication Middleware for the login and registration pages
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

// Authentication Middleware for the dashboard
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

// Authentication Middleware for general pages
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please log in to view this page.');
  res.redirect('/users/login');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

