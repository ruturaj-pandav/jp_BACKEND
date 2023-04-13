const mongoose = require("mongoose");

const applicationsSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  postingId: { type: String, required: true },
  brief: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Applications = mongoose.model("applications", applicationsSchema);

module.exports = Applications;
