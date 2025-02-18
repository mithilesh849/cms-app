import mongoose from "mongoose";

const ChargingHistorySchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  station: { type: mongoose.Schema.Types.ObjectId, ref: "ChargingStation", required: true },
  slot: { type: String, required: true }, // Example: "Slot-1"
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date }, // Populated when session ends
  chargedPercentage: { type: Number, min: 0, max: 100, required: true },
  energyDelivered: { type: Number, required: true }, // in KWH
  status: { type: String, enum: ["Charging", "Idle", "Disconnected"], required: true }
});

const ChargingHistory = mongoose.model("ChargingHistory", ChargingHistorySchema);
export default ChargingHistory;
