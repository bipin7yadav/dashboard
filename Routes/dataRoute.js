const express = require("express");
const dataController = require("../Controllers/dataController");

const router = express.Router();

router
  .route('/')
  .get(dataController.getAllData)


module.exports = router;