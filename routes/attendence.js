const router = require("express").Router();
const Student = require("../models/students");

router.post("/", async (req, res) => {
  const newUser = new Student({
    rollNo: req.body.rollNo,
    name: req.body.name,
  });

  //current Time
  const date = new Date();
  const time = date.getHours() + ":" + date.getMinutes();

  try {
    const stdnt = await Student.findOne({
      rollNo: req.body.rollNo,
      name: req.body.name,
    });
    // const stdnt1 = await student.findOne({ rollNo: req
    const studentRoll = await Student.findOne({ rollNo: req.body.rollNo });
    const studentName = await Student.findOne({ name: req.body.name });

    
    if (!stdnt && !studentRoll) {
      //checkIn of new student
      const savedUser = await newUser.save();
      console.log("loggedIn");
      res
        .status(200)
        .json({ success: true, data: savedUser, message: "Checked In", time: time });
    } else if (stdnt) {
      //checkOut of existing student
      let query = { rollNo: req.body.rollNo };
      Student.deleteOne(query, function (err, obj) {
        if (err) throw err;
        console.log("document deleted");
      });
      console.log("loggedOut");
      res
        .status(200)
        .json({ success: true, data: stdnt, message: "Checked Out" , time: time});
    } else if (studentRoll) {
      console.log("rollNo");
      // return next(new ErrorResponse("Roll No. already exists", 200));
      res.status(200).json({
        success: true,
        data: studentRoll,
        message: "Roll No. already exists",
        time: null,
      });
    }
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
    res.status(500).json({ success: false, message: err.message, time: null });
  }
});

module.exports = router;
