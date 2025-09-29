import express from 'express';
import {

createAccount,
getAccounts,
getAccountById,
updateAccount,
deleteAccount,
updateAccountBalance
} from '../controllers/accountController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', protect, createAccount);
router.get('/', protect, getAccounts);
router.get('/:id', protect, getAccountById);
router.put('/:id', protect, updateAccount);
router.patch('/:id/balance', protect, updateAccountBalance);
router.delete('/:id', protect, deleteAccount);

export default router;