const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reportDB = mongoose.connection.useDb("reportsDB");
const emergencyDB = mongoose.connection.useDb("emergencyDB");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer File Filter (Images & Videos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/mov", "video/avi"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

// Report Schema
const ReportSchema = new mongoose.Schema({
  name: String,
  location: String,
  datetime: Date,
  subject: String,
  description: String,
  contact: String,
  email: String,
  fileUrl: String,
});
const Report = reportDB.model("Report", ReportSchema);

// Emergency Report Schema
const EmergencySchema = new mongoose.Schema({
  fileUrl: String,
  location: String,
  timestamp: { type: Date, default: Date.now },
});
const Emergency = emergencyDB.model("Emergency", EmergencySchema);

// API to Submit FIR Report (Accepts Image/Video)
app.post("/api/reports", upload.single("file"), async (req, res) => {
  try {
    const { name, location, datetime, subject, description, contact, email } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newReport = new Report({
      name,
      location,
      datetime,
      subject,
      description,
      contact,
      email,
      fileUrl,
    });
    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting report", error });
  }
});

// API to Handle SOS Emergency Report (Accepts Image/Video)
app.post("/api/emergency", upload.single("file"), async (req, res) => {
  try {
    const { location } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newEmergency = new Emergency({ fileUrl, location });
    await newEmergency.save();
    res.status(201).json({ message: "Emergency reported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error reporting emergency", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});