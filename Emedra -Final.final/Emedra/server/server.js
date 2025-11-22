import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import axios from "axios";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// auth routes
app.use("/api/auth", authRoutes);

// ----------  Uploads ----------
const UPLOADS_FOLDER = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_FOLDER)) fs.mkdirSync(UPLOADS_FOLDER);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_FOLDER),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// upload route
app.post("/api/reports/upload", upload.single("report"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({
      message: "✅ PDF uploaded successfully",
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

// serve files
app.use("/uploads", express.static(UPLOADS_FOLDER));

// ----------  ML prediction ----------
app.post("/api/heart-predict", async (req, res) => {
  try {
    // talks to Flask on 5001
    const response = await axios.post("http://127.0.0.1:5001/predict", req.body);
    const { severity, alert } = response.data;

    return res.json({
      status: severity === "Critical" ? "🚨 Emergency Alert" : "✅ Normal",
      message: alert,
    });
  } catch (error) {
    console.error("ML connection error:", error.message);
    res.status(500).json({ error: "ML server not responding" });
  }
});

// ----------  start ----------
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Node backend running on port ${PORT}`));
