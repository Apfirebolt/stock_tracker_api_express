import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  changePassword
} from '../controllers/authController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/register')
  .post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.put('/change-password', protect, changePassword)

export default router