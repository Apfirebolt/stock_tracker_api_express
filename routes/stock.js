import express from 'express';
import {
createStock,
getStocks,
getStockById,
updateStock
} from '../controllers/stockController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', protect, createStock);
router.get('/', protect, getStocks);
router.get('/:id', protect, getStockById);
router.put('/:id', protect, updateStock);

export default router;