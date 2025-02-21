const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  filename: String,
  text: String,
  atsScore: Number,
  missingSections: [String],
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CV", cvSchema);