import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import stationRoutes from "./routes/stationRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import chargingHistoryRoutes from "./routes/chargingHistoryRoutes.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

//
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with frontend URL
    methods: ["GET", "POST"]
  },
});

// Connect Database
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"], // Add methods you use
  credentials: true // If you are using cookies for authentication
}));

// Setup Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/stations", stationRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/charging-history", chargingHistoryRoutes);

// Start Server with Socket.io
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});