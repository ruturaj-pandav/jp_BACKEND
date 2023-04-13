const express = require("express");
const router = express.Router();
const employerControllers = require("../controllers/employerControllers");
const { isLoggedIn } = require("../middlewares/verifyEmployerLogin");

router.get(
  "/employer-postings",
  isLoggedIn,
  employerControllers.employerPostings
);
router.post("/create-account", employerControllers.Registration);
router.post("/create-job", isLoggedIn, employerControllers.createJOB);
router.delete(
  "/delete-posting/:postingId",
  isLoggedIn,
  employerControllers.deletePosting
);
router.post("/login", employerControllers.login);
router.delete("/delete-account", isLoggedIn, employerControllers.deleteAccount);
router.get("/information", isLoggedIn, employerControllers.details);

// ALL POSTINGS BELOW
router.get("/all-postings", isLoggedIn, employerControllers.AllPostings);

module.exports = router;

// create different middlewares for - exists in product , exists in cart , exists in wishlist
