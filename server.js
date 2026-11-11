
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5500";

// Middleware
app.use(helmet());
app.use(cors({
  origin: CLIENT_ORIGIN
}));
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.json({
    message: "RailOps Backend API is running",
    status: "success"
  });
});

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    application: "RailOps Railroad Management System",
    timestamp: new Date().toISOString()
  });
});

// Temporary train API for testing
app.get("/api/trains", (req, res) => {
  res.json({
    success: true,
    trains: [
      {
        id: "UP101",
        origin: "Dallas",
        destination: "Chicago",
        status: "Running"
      },
      {
        id: "UP102",
        origin: "Houston",
        destination: "Denver",
        status: "Delayed"
      },
      {
        id: "UP103",
        origin: "Omaha",
        destination: "Kansas City",
        status: "Completed"
      }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`RailOps backend running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
