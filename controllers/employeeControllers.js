const Employees = require("../schemas/employees");
const Postings = require("../schemas/postings");
const Applications = require("../schemas/applications");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password fields exist in the request body
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user account exists
    const employee = await Employees.findOne({ email });
    if (!employee) {
      return res
        .status(400)
        .json({ message: "account with this mail not found" });
    }

    // Validate password
    const isMatch = employee.password === password;
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    // Generate JWT token with 10 hour expiry
    const token = jwt.sign(
      { employeeId: employee._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error - IN EMPLOYEE LOGIN" });
  }
};

exports.createJOB = async (req, res) => {
  const { title, jd, minexp, type, salary, note } = req.body;
  const employerId = req.employerId;
  // Check if all required fields are present
  if (!title || !jd || !minexp || !type || !salary || !note) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user account with email already exists

    const employer = await Employers.findById(req.employerId);
    if (!employer) {
      return res
        .status(404)
        .json({ message: "employer not foundddd", employerId });
    }

    // Create new user
    const postings = new Postings({
      title,
      jd,
      minexp,
      type,
      salary,
      note,
      employerId,
      companyName: employer.companyName,
    });

    // Save user to database
    await postings.save();
    res.json({
      message: "new job created",
    });
  } catch (err) {
    res.status(500).json({
      message: "erro1",
      error: err.message,
    });
  }
};
exports.createApplication = async (req, res) => {
  const { brief } = req.body;
  const postingId = req.params.postingId;

  const employeeId = req.employeeId;
  // Check if all required fields are present
  if (!brief || !postingId) {
    return res.status(400).json({ message: "brief and postingId is required" });
  }

  try {
    // Check if user account with email already exists
    const existingApplication = await Applications.findOne({ employeeId });
    if (existingApplication) {
      return res.status(400).json({ message: "one application already there" });
    }

    // Create new user
    const application = new Applications({
      employeeId,
      postingId,
      brief,
    });

    // Save user to database
    await application.save();

    // Generate JWT token with 10 hour expiry

    res.json({ message: "applicaiton created " });
  } catch (err) {
    res.status(500).json({
      message: "Server error - IN application created",
      error: err.message,
    });
  }
};
exports.Registration = async (req, res) => {
  const { email, password, firstName, lastName, mobile } = req.body;

  // Check if all required fields are present
  if (!firstName || !lastName || !email || !password || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user account with email already exists
    const existingUser = await Employees.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const employee = new Employees({
      firstName,
      lastName,
      email,
      password,
      mobile,
    });

    // Save user to database
    await employee.save();

    // Generate JWT token with 10 hour expiry
    const token = jwt.sign(
      { employeeId: employee._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );

    res.json({ message: "Employee created ", token });
  } catch (err) {
    res.status(500).json({
      message: "Server error - IN EMPLOYEe REGISTRATION",
      error: err.message,
    });
  }
};
exports.changePassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  // Check if password and confirmPassword fields are present and equal
  if (!password || !confirmPassword || password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Find user with the decoded ID
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password and update user document

    user.password = password;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.AllPostings = async (req, res) => {
  try {
    // Find user with the decoded ID
    const postings = await Postings.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.employerPostings = async (req, res) => {
  try {
    // Find user with the decoded ID

    const employerPostings = await Postings.find({
      employerId: req.employerId,
    });
    if (!employerPostings) {
      return res.status(404).json({ message: "employer not found" });
    }

    res.json(employerPostings);
  } catch (err) {
    res.status(500).json({ message: "Server error - in EMPLOYER INFORMATION" });
  }
};
exports.details = async (req, res) => {
  try {
    // Find user with the decoded ID

    const employer = await Employers.findById(req.employerId);
    if (!employer) {
      return res.status(404).json({ message: "employer not found" });
    }

    res.json(employer);
  } catch (err) {
    res.status(500).json({ message: "Server error - in EMPLOYER INFORMATION" });
  }
};

exports.deleteApplication = async (req, res) => {
  let applicationId = req.params.applicationId;
  try {
    if (!applicationId) {
      return res.json({ message: "applicationId required " });
    }
    // Find user with the decoded ID and delete the user
    const application = await Applications.findByIdAndDelete(applicationId);
    if (!application) {
      return res.status(404).json({ message: "application not found" });
    }

    res.json({ message: "application deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Server error - in delete application",
        message: err.message,
      });
  }
};
exports.deleteAccount = async (req, res) => {
  try {
    // Find user with the decoded ID and delete the user
    const employee = await Employees.findByIdAndDelete(req.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "employee not found" });
    }

    res.json({ message: "employee deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error - in delete account for employee" });
  }
};
