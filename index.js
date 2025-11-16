const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const Student = require("./init/studentdata.js");
const Admin = require("./init/adminDatabase.js");

app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/caremn");
}

main().then(() => {
  console.log("connection success");
});

app.listen(8080, () => {
  console.log("server is listening");
});

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// app.get("/studentlogin", (req, res) => {
//   res.render("studentDashboard.ejs");
// });
let student;
// app.get("/dashboards", async (req, res) => {
//   let { email } = req.query;
//   student = await Student.findOne({ email: email });
//   // res.render("studentDashboard.ejs", { student });
//   res.redirect("/dashboard");
// });

app.post("/studentlogin", async (req, res) => {
  let { email, paswd } = req.body;
  try {
    student = await Student.findOne({ email: email });
    if (paswd == student.paswd) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.redirect("/login");
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    student = await Student.findOne({ email: student.email });
    res.render("studentDashboard.ejs", { student });
  } catch (err) {
    res.redirect("/login");
  }
});

app.get("/newcomplaint", async (req, res) => {
  let { comp, room, building, floor } = req.query;
  let complaint = `${comp} , room no ${room} , ${floor} Floor, ${building} `;
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: student._id },
      {
        $push: {
          complaints: {
            $each: [
              {
                complaint: complaint,
              },
            ],
            // $position: 0, // 👈 inserts at the beginning
          },
        },
      }
      // { new: true }
    );
    res.redirect("/dashboard");
  } catch (err) {
    res.redirect("/login");
  }
});

app.get("/admin", async (req, res) => {
  res.render("adminlogin.ejs");
});

let admin;

app.post("/admindashboard", async (req, res) => {
  try {
    let { email, paswd } = req.body;

    admin = await Admin.findOne({ email: email });
    if (paswd == admin.paswd) {
      res.redirect("/admindashboard");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.redirect("/login");
  }
});

app.get("/admindashboard", async (req, res) => {
  try {
    admin = await Admin.findOne({ email: admin.email });
    let allStudents = await Student.find();
    // console.log(allStudents);
    let allComplaints = [];
    for (let comp of allStudents) {
      for (let singComp of comp.complaints) {
        allComplaints.unshift(singComp);
      }
    }
    let resolvedComplaints = [];
    let pendingComplaints = [];
    let inprogressConplaints = [];
    for (let complaint of allComplaints) {
      if (complaint.status == "Pending") {
        pendingComplaints.unshift(complaint);
      } else if (complaint.status == "Resolved") {
        resolvedComplaints.unshift(complaint);
      } else {
        inprogressConplaints.unshift(complaint);
      }
    }
    // console.log(pendingComplaints);
    // console.log(resolvedComplaints);
    res.render("admindashboard.ejs", {
      admin,
      allComplaints,
      pendingComplaints,
      resolvedComplaints,
      inprogressConplaints,
    });
  } catch (err) {
    res.redirect("/login");
  }
});

app.get("/status/:id/pending", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    await Student.updateOne(
      { "complaints._id": id },
      {
        $set: {
          "complaints.$.status": "Assign", // new status
        },
      }
    );
    res.redirect("/admindashboard");
  } catch (err) {
    res.redirect("/login");
  }
});

app.get("/status/:id/assign", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    await Student.updateOne(
      { "complaints._id": id },
      {
        $set: {
          "complaints.$.status": "Resolved", // new status
        },
      }
    );
    res.redirect("/admindashboard");
  } catch (err) {
    res.redirect("/login");
  }
});
