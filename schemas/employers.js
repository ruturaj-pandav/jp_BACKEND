const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  password: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const Employers = mongoose.model("employers", employerSchema);

module.exports = Employers;
