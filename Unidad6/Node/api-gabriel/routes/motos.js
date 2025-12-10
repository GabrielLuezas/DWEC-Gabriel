var express = require("express");
var router = express.Router();
const MotosServices = require("../services/motos.services");

/* GET motos listing. */
router.get("/", function (req, res, next) {
  res.json(MotosServices.get());
});

router.post("/", function (req, res, next) {
  res.json(
    MotosServices.post(req.body.marca, req.body.modelo, req.body.precio)
  );
});

module.exports = router;
