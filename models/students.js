const mongoose = require("mongoose");

const Student = new mongoose.Schema(
  {
    rollNo: { type: Number , required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", Student);
