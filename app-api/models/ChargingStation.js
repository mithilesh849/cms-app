import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  slotId: { type: String, required: true, unique: true }, // Unique identifier for each slot
  status: { 
    type: String, 
    enum: ["Charging", "Available", "Faulted", "Occupied"], 
    required: true 
  },
  connectorStatus: { 
    type: String, 
    enum: ["Connected", "Disconnected", "Error"]
  },
  currentVehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", default: null }, // Stores connected vehicle
  powerOutput: { type: Number, default: 0 } // Real-time charging power in kW
});

const ChargingStationSchema = new mongoose.Schema({
  stationId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  systemHealth: {
    maintenanceDate: { type: String, required: true },
    currentHealth: { type: String, enum: ["Good", "Needs Maintenance", "Critical"], required: true }
  },
  stationSpecification: {
    maxPowerOutput: { type: Number, required: true }, // in kW
    inputVoltage: { type: Number, required: true },
    outputRange: { type: String, required: true },
    maxCurrent: { type: Number, required: true } // in Amps
  },
  chargerCommunication: {
    slots: [
      {
        slotId: { type: String, required: true },
        status: { type: String, enum: ["Online", "Offline", "No Data"], required: true }
      }
    ]
  },
  slots: [SlotSchema] // Storing multiple slots with individual statuses
});

const ChargingStation = mongoose.model("ChargingStation", ChargingStationSchema);

export default ChargingStation;
