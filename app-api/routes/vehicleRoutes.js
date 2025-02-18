import express from 'express';
import { 
    createVehicle, 
    getVehicles, 
    getVehicleById, 
    updateVehicle, 
    deleteVehicle 
} from '../controllers/vehicleController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new vehicle
router.post('/', authMiddleware, createVehicle);

// Get all vehicles
router.get('/', authMiddleware, getVehicles);

// Get a specific vehicle by ID
router.get('/:id', authMiddleware, getVehicleById); 

// Update a vehicle
router.put('/:id', authMiddleware, updateVehicle);

// Delete a vehicle
router.delete('/:id', authMiddleware, deleteVehicle);

export default router;
