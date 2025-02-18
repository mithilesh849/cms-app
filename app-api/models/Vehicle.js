import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["Electric", "Hybrid", "Other"], required: true },
  manufacturer: { type: String },
  model: { type: String },
  batteryCapacity: { type: Number, required: true },
  batteryHealth: { type: String, enum: ["Good", "Average", "Poor"], required: true },
  status: { type: String, enum: ["Charging", "Idle", "Disconnected"], required: true },
  licensePlate: { type: String, unique: true },
  slotId: { type: String, default: null }, // Tracks which slot the vehicle is connected to
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: "ChargingStation", default: null },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
