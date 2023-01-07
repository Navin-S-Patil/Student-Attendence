const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");

const studentAttendance = require("./routes/attendence");
const studentCount = require("./routes/studentCount");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/attendence", studentAttendance);
app.use("/api/studentCount", studentCount);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running! " + process.env.PORT);
});
