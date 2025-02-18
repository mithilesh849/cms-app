import ChargingStation from "../models/ChargingStation.js";
import { io } from "../server.js"; 

// Create a new charging station
export const createStation = async (req, res) => {
  try {
    const stationData = new ChargingStation(req.body);
    const savedStation = await stationData.save();

    // Emit real-time event to all clients
    io.emit("stationCreated", savedStation);

    res.status(201).json(savedStation);
  } catch (error) {
    console.error("Error creating station:", error);
    res.status(500).json({ message: "An error occurred while creating the station." });
  }
};

// Get all charging stations
export const getStations = async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error);
    res.status(500).json({ message: "An error occurred while fetching stations." });
  }
};

// Get a specific charging station by ID
export const getStationById = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    res.json(station);
  } catch (error) {
    console.error("Error fetching station by ID:", error);
    res.status(500).json({ message: "An error occurred while fetching the station." });
  }
};

// Update a charging station
export const updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    // Update only the provided fields
    Object.assign(station, req.body);
    const updatedStation = await station.save();

    // Emit real-time event for station update
    io.emit("stationUpdated", updatedStation);

    res.json(updatedStation);
  } catch (error) {
    console.error("Error updating station:", error);
    res.status(500).json({ message: "An error occurred while updating the station." });
  }
};

// Delete a charging station
export const deleteStation = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    await station.deleteOne();

    // Emit real-time event for station deletion
    io.emit("stationDeleted", { stationId: req.params.id });

    res.json({ message: "Charging station deleted successfully" });
  } catch (error) {
    console.error("Error deleting station:", error);
    res.status(500).json({ message: "An error occurred while deleting the station." });
  }
};