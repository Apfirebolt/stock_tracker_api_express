import express from 'express';
import {
createStock,
getStocks,
getStockById,
} from '../controllers/stockController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', protect, createStock);
router.get('/', protect, getStocks);
router.get('/:id', protect, getStockById);

export default router;