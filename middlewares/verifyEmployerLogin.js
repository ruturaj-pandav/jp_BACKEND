const jwt = require('jsonwebtoken');
const Employers = require('../schemas/employers'); // Assuming you have a User model defined in a separate file

// Middleware to check if user is logged in
exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get JWT token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'From middleware - unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token and decode payload
    const employerId = decodedToken.employerId;

    const employer = await Employers.findById(employerId); // Find user with the decoded ID

    if (!employer) {
      return res.status(401).json({ message: 'From middleware- Employer not found in database' });
    }


    req.employerId = employerId; // Add user ID to request object
    next();
  } catch (err) {
   
    res.status(500).json({ message: 'From middleware - server error' , error : err.message , token });
  }
};