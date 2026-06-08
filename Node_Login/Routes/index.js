const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", { title: "Express" });
});

// router.get("/users/runstatus", (req, res) => {
//     res.render("runstatus", { title: "Runstatus" });
//   });

  router.get("/users/epadata", (req, res) => {
    res.render("epadata", { title: "EPA DATA" });
  });

  router.get("/users/form", (req, res) => {
    res.render("form", { Server: "Form" });
  });


  
//   router.get("/users/dummy", (req, res) => {
//     res.render("dummy", { Server: "Server" });
//   });

module.exports = router;