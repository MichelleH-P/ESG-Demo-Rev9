const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", { title: "Express" });
});

router.get("/users/form", (req, res) => {
    res.render("form", { Server: "Server" });
  });

  router.get("/users/documentation", (req, res) => {
    res.render("documentation", { Server: "Documentation" });
  });

module.exports = router;