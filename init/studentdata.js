const mongoose = require("mongoose");

const sampleData = [
  {
    sname: "Aarav Mehta",
    sroll: 2501350001,
    school: "SOET",
    dept: "Computer Science",
    email: "aarav.mehta@gmail.com",
    paswd: "Aarav@123",
    complaints: [
      { status: "Pending", complaint: "WiFi not working in hostel" },
      { status: "Resolved", complaint: "Library AC not functioning" },
    ],
  },
  {
    sname: "Diya Sharma",
    sroll: 2501250002,
    school: "SOMC",
    dept: "Mass Communication",
    email: "diya.sharma@gmail.com",
    paswd: "Diya@123",
    complaints: [
      { status: "Pending", complaint: "Projector not working in class" },
    ],
  },
  {
    sname: "Rohan Patel",
    sroll: 2501350003,
    school: "SOET",
    dept: "Mechanical Engineering",
    email: "rohan.patel@gmail.com",
    paswd: "Rohan@123",
    complaints: [
      { status: "Pending", complaint: "Workshop machines need maintenance" },
    ],
  },
  {
    sname: "Ishita Singh",
    sroll: 2501250004,
    school: "SOMC",
    dept: "Media Studies",
    email: "ishita.singh@gmail.com",
    paswd: "Ishita@123",
    complaints: [
      { status: "Resolved", complaint: "Studio lights not available" },
      { status: "Pending", complaint: "Mic not working during shoot" },
    ],
  },
  {
    sname: "Aditya Verma",
    sroll: 2501350005,
    school: "SOET",
    dept: "Electrical Engineering",
    email: "aditya.verma@gmail.com",
    paswd: "Aditya@123",
    complaints: [{ status: "Pending", complaint: "Lab equipment damaged" }],
  },
  {
    sname: "Sneha Gupta",
    sroll: 2501250006,
    school: "SOMC",
    dept: "Advertising",
    email: "sneha.gupta@gmail.com",
    paswd: "Sneha@123",
    complaints: [
      { status: "Resolved", complaint: "Camera lenses not available" },
    ],
  },
  {
    sname: "Arjun Nair",
    sroll: 2501350007,
    school: "SOET",
    dept: "Civil Engineering",
    email: "arjun.nair@gmail.com",
    paswd: "Arjun@123",
    complaints: [
      { status: "Pending", complaint: "Survey instruments missing" },
    ],
  },
  {
    sname: "Kavya Kapoor",
    sroll: 2501250008,
    school: "SOMC",
    dept: "Film Production",
    email: "kavya.kapoor@gmail.com",
    paswd: "Kavya@123",
    complaints: [
      { status: "Resolved", complaint: "Editing software not licensed" },
    ],
  },
  {
    sname: "Manav Joshi",
    sroll: 2501350009,
    school: "SOET",
    dept: "Information Technology",
    email: "manav.joshi@gmail.com",
    paswd: "Manav@123",
    complaints: [
      { status: "Pending", complaint: "LAN cable broken in lab" },
      { status: "Resolved", complaint: "Slow internet issue" },
    ],
  },
  {
    sname: "Tanya Deshmukh",
    sroll: 2501250010,
    school: "SOMC",
    dept: "Public Relations",
    email: "tanya.deshmukh@gmail.com",
    paswd: "Tanya@123",
    complaints: [{ status: "Pending", complaint: "Printer not working" }],
  },
];

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/caremn");
}

main().then(() => {
  console.log("connection success");
});

const studentDataSchema = new mongoose.Schema({
  sname: String,
  sroll: Number,
  school: String,
  dept: String,
  email: String,
  paswd: String,
  complaints: [
    {
      id: String,
      status: {
        type: String,
        default: "Pending",
      },
      complaint: String,
    },
  ],
});

const Student = mongoose.model("Student", studentDataSchema);

// Student.insertMany(sampleData);

module.exports = Student;
