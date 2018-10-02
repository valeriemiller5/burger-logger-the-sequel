var express = require("express");
var router = express.Router();
var db = require("../models");

// Create routes from burger.js
router.get("/", function(req, res) {
  db.Burger.findAll({})
    .then(function(data) {
      var hbsObject = {
        burgers: data
      };
      // console.log(hbsObject);
      res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name
  }).then(function(data) {
    res.json({ id: data.insertId });
  });
});

router.put("/api/burgers/:id?", function(req, res) {
  db.Burger.update({
    devoured: true
   }, {
    where: {
      id: req.params.id
    }
   }).then(function(data) {
      console.log("Update has been made.")
      res.json(data);
   })
    .catch(function(err) {
      res.json(err);
    });
});

// Routes exported to server.js
module.exports = router;