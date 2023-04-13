const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeControllers");
const { isLoggedIn } = require("../middlewares/verifyEmployeeLogin");


router.get("/employer-postings", isLoggedIn, employeeControllers.employerPostings);
router.post("/create-account", employeeControllers.Registration);
router.post("/create-application/:postingId", isLoggedIn , employeeControllers.createApplication);
router.post("/create-job", isLoggedIn, employeeControllers.createJOB);
router.delete("/delete-application/:applicationId" , isLoggedIn , employeeControllers.deleteApplication);
router.post("/login", employeeControllers.login);
router.delete("/delete-account", isLoggedIn, employeeControllers.deleteAccount);
router.get("/information", isLoggedIn, employeeControllers.details);

// ALL POSTINGS BELOW
router.get("/all-postings", isLoggedIn, employeeControllers.AllPostings);

module.exports = router;



// create different middlewares for - exists in product , exists in cart , exists in wishlist