const mongoose = require("mongoose");

const postingSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  employerId: { type: String, required: true },
  title: { type: String, required: true },
  jd: { type: String, required: true },
  minexp: { type: Number, required: true },
  type: { type: String, required: true },
  salary: { type: Number, required: true },
  note: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const Postings = mongoose.model("postings", postingSchema);

module.exports = Postings;
