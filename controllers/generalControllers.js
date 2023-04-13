const Employers = require("../schemas/employers");
const Postings = require("../schemas/postings");
const jwt = require("jsonwebtoken");




exports.allPostings = async (req, res) => {
  try {
    // Find user with the decoded ID
    const postings = await Postings.find({});
    if (!postings) {
      return res.status(404).json({ message: "sending all postngs" });
    }

    res.json(postings);
  } catch (err) {
 
    res.status(500).json({ message: "Server error" });
  }
};
