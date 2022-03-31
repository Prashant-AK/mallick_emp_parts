import express from 'express'
const router = express.Router()
import {
  getInvest,
  getInvestById,
  deleteInvest,
  createInvest,
  updateInvest,
  createInvestReview,
  getTopInvest,
} from '../controllers/investController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getInvest).post(protect, admin, createInvest)
router.route('/:id/reviews').post(protect, createInvestReview)
router.get('/top', getTopInvest)
router
  .route('/:id')
  .get(getInvestById)
  .delete(protect, admin, deleteInvest)
  .put(protect, admin, updateInvest)

export default router
