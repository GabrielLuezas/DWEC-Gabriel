var express = require("express");
var router = express.Router();
const LibrosServices = require("../services/libros.services");

/* GET motos listing. */
router.get("/", function (req, res, next) {
  res.json(LibrosServices.get());
});

router.post("/", function (req, res, next) {
  res.json(
    LibrosServices.post(req.body.nombre, req.body.paginas, req.body.prestado)
  );
});

module.exports = router;
