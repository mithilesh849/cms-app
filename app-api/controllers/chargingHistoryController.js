import ChargingHistory from "../models/ChargingHistory.js";
import { io } from "../server.js"; 

// ✅ Create a new charging history entry (Vehicle connects to slot)
export const createChargingHistory = async (req, res) => {
    try {
        const { vehicle, station, slot, startTime, chargedPercentage, energyDelivered } = req.body;

        if (!vehicle || !station || !slot || chargedPercentage === undefined || energyDelivered === undefined) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const historyEntry = new ChargingHistory({
            vehicle,
            station,
            slot,
            startTime: startTime || new Date(),
            chargedPercentage,
            energyDelivered,
            status: "Charging", // Initial status
        });

        const savedEntry = await historyEntry.save();

        // Emit real-time update to all connected clients
        io.emit("chargingStatusUpdate", {
            id: savedEntry._id,
            vehicle: savedEntry.vehicle,
            station: savedEntry.station,
            slot: savedEntry.slot,
            status: "Charging",
            startTime: savedEntry.startTime,
            chargedPercentage: savedEntry.chargedPercentage,
            energyDelivered: savedEntry.energyDelivered,
        });

        res.status(201).json(savedEntry);
    } catch (error) {
        console.error("Error creating charging history:", error);
        res.status(500).json({ message: "An error occurred while creating the charging history." });
    }
};

// ✅ Get all charging history entries
export const getChargingHistories = async (req, res) => {
    try {
        const history = await ChargingHistory.find().populate("vehicle station");
        res.json(history);
    } catch (error) {
        console.error("Error fetching charging histories:", error);
        res.status(500).json({ message: "An error occurred while fetching charging histories." });
    }
};

// ✅ Get charging history entries by vehicle ID, slot, and status
export const getChargingHistoryByCriteria = async (req, res) => {
    try {
        const { vehicle, slot, status } = req.query;

        // Construct the query object
        let query = {};
        
        if (vehicle) query.vehicle = vehicle;
        if (slot) query.slot = slot;
        if (status) query.status = status;

        // Fetch and populate
        const historyEntries = await ChargingHistory.find(query)
            .populate("vehicle station")
            .sort({ startTime: -1 }); // Sort by most recent first

        if (historyEntries.length === 0) {
            return res.status(404).json({ message: "No matching charging history found" });
        }

        res.json(historyEntries);
    } catch (error) {
        console.error("Error fetching charging history by criteria:", error);
        res.status(500).json({ message: "An error occurred while fetching the charging history." });
    }
};

// ✅ Update charging status (e.g., Charging complete)
export const updateChargingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, endTime, chargedPercentage, energyDelivered } = req.body;

        const historyEntry = await ChargingHistory.findById(id);
        if (!historyEntry) {
            return res.status(404).json({ message: "Charging history not found" });
        }

        // Update only the fields that are provided in the request
        if (status) historyEntry.status = status;
        if (endTime) historyEntry.endTime = endTime;
        if (chargedPercentage !== undefined) historyEntry.chargedPercentage = chargedPercentage;
        if (energyDelivered !== undefined) historyEntry.energyDelivered = energyDelivered;

        const updatedEntry = await historyEntry.save();

        // Here we directly populate after saving. It's one query instead of two.
        const populatedEntry = await ChargingHistory.findById(updatedEntry._id).populate("vehicle station");
        
        // Emit real-time update to clients with all relevant fields, including populated data
        io.emit("chargingStatusUpdate", {
            id: populatedEntry._id,
            vehicle: populatedEntry.vehicle,
            station: populatedEntry.station,
            slot: populatedEntry.slot,
            status: populatedEntry.status,
            startTime: populatedEntry.startTime,
            endTime: populatedEntry.endTime,
            chargedPercentage: populatedEntry.chargedPercentage,
            energyDelivered: populatedEntry.energyDelivered,
        });

        res.json(populatedEntry);
    } catch (error) {
        console.error("Error updating charging status:", error);
        res.status(500).json({ message: "An error occurred while updating the charging status." });
    }
};

// ✅ Delete a charging history entry
export const deleteChargingHistory = async (req, res) => {
    try {
        const { id } = req.params;

        const historyEntry = await ChargingHistory.findById(id);
        if (!historyEntry) {
            return res.status(404).json({ message: "Charging history not found" });
        }

        await historyEntry.deleteOne();

        // Emit real-time deletion event
        io.emit("chargingHistoryDeleted", { id });

        res.json({ message: "Charging history deleted successfully" });
    } catch (error) {
        console.error("Error deleting charging history:", error);
        res.status(500).json({ message: "An error occurred while deleting the charging history." });
    }
};