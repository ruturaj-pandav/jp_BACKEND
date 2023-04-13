const Employers = require("../schemas/employers");
const Postings = require("../schemas/postings");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password fields exist in the request body
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user account exists
    const employer = await Employers.findOne({ email });
    if (!employer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isMatch = employer.password === password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token with 10 hour expiry
    const token = jwt.sign(
      { employerId: employer._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );

    res.json({ token });
  } catch (err) {
   
    res.status(500).json({ message: "Server error - IN EMPLOYER LOGIN" });
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
      message : "new job created"
    })
  } catch (err) {
    
    res.status(500).json({
      message: "erro1",
      error: err.message,
    });
  }
};
exports.Registration = async (req, res) => {
  const { email, password, firstName, lastName, companyName } = req.body;

  // Check if all required fields are present
  if (!firstName || !lastName || !email || !password || !companyName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user account with email already exists
    const existingUser = await Employers.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const employer = new Employers({
      firstName,
      lastName,
      email,
      password,
      companyName,
    });

    // Save user to database
    await employer.save();

    // Generate JWT token with 10 hour expiry
    const token = jwt.sign(
      { employerId: employer._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );

    res.json({ message: "Employer  created ", token });
  } catch (err) {
   
    res.status(500).json({
      message: "Server error - IN EMPLOYER REGISTRATION",
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

    const employerPostings = await Postings.find({employerId : req.employerId});
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


exports.deletePosting = async (req, res) => {
  let postingId = req.params.postingId;
  try {
    if (!postingId) {
      return res.json({ message: "postingid required "})
    }
    // Find user with the decoded ID and delete the user
    const posting = await Postings.findByIdAndDelete(postingId);
    if (!posting) {
      return res.status(404).json({ message: "posting not found" });
    }

    res.json({ message: "posting deleted successfully" });
  } catch (err) {
    
    res.status(500).json({ message: "Server error - in delete posting" });
  }
};
exports.deleteAccount = async (req, res) => {
  try {
    // Find user with the decoded ID and delete the user
    const employer = await Employers.findByIdAndDelete(req.employerId);
    if (!employer) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
   
    res.status(500).json({ message: "Server error - in delete account" });
  }
};
