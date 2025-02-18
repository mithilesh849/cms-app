import Vehicle from '../models/Vehicle.js';
import { io } from '../server.js';

// Create a new vehicle
export const createVehicle = async (req, res) => {
    try {
        const vehicleData = new Vehicle({
            vehicleId: req.body.vehicleId,
            name: req.body.name,
            type: req.body.type,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            batteryCapacity: req.body.batteryCapacity,
            batteryHealth: req.body.batteryHealth,
            status: req.body.status,
            licensePlate: req.body.licensePlate,
            slotId: req.body.slotId || null,
            stationId: req.body.stationId || null
        });

        await vehicleData.save();
        io.emit("vehicleCreated", vehicleData);
        res.status(201).json(vehicleData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all vehicles
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific vehicle by ID
export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a vehicle
export const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        Object.assign(vehicle, req.body);
        await vehicle.save();
        io.emit("vehicleUpdated", vehicle);
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update vehicle status (connect/disconnect)
export const updateVehicleStatus = async (req, res) => {
    try {
        const { status, slotId, stationId } = req.body;
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        vehicle.status = status || vehicle.status;
        vehicle.slotId = slotId || null;
        vehicle.stationId = stationId || null;
        await vehicle.save();

        io.emit("vehicleStatusUpdate", {
            vehicleId: vehicle.vehicleId,
            status: vehicle.status,
            slotId: vehicle.slotId,
            stationId: vehicle.stationId,
        });

        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a vehicle
export const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        await vehicle.deleteOne();
        io.emit("vehicleDeleted", { vehicleId: vehicle.vehicleId });
        res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
