import express from "express";
import {
  createChargingHistory,
  getChargingHistories,
  getChargingHistoryByCriteria,
  updateChargingStatus,
} from "../controllers/chargingHistoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new charging history entry
router.post("/", authMiddleware, createChargingHistory);

// Get all charging history records
router.get("/", authMiddleware, getChargingHistories);

// Get a specific charging history by ID
router.get("/:id", authMiddleware, getChargingHistoryByCriteria);

// Update a charging history entry
router.put("/:id", authMiddleware, updateChargingStatus);

export default router;
