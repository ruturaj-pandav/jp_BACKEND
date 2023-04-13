const express = require("express");
const router = express.Router();
const generalControllers = require("../controllers/generalControllers");

router.get(
  "/all-postings",

  generalControllers.allPostings
);

module.exports = router;
