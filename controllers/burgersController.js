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
      console.log(hbsObject);
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
  var condition = "id = " + req.params.id;
  console.log("Condition: " + condition);

  db.Burger.update({
    devoured: true
  }, {
    where: {
      id: condition
    }
  }).then(function() {
    res.redirect("/.change-devour");
  })
});
// Routes exported to server.js
module.exports = router;