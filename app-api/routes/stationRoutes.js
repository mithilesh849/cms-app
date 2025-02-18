import express from 'express';
import { 
    createStation, 
    getStations, 
    getStationById, 
    updateStation, 
    deleteStation 
} from '../controllers/stationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new charging station
router.post('/', authMiddleware, createStation);

// Get all charging stations
router.get('/', authMiddleware, getStations);

// Get a specific charging station by ID
router.get('/:id', authMiddleware, getStationById);

// Update a charging station
router.put('/:id', authMiddleware, updateStation);

// Delete a charging station
router.delete('/:id', authMiddleware, deleteStation);

export default router;
