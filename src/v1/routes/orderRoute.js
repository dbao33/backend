import express from 'express'
import {
    createOrder, getDetailsOrder, getAllOrderDetails,
} from '../controllers/orderController.js'

import { authUserMiddleware } from '../middlerwares/authMiddlerware.js'


const router = express.Router()

router.post('/create', authUserMiddleware, createOrder)
router.get('/get-details-order/:id', getDetailsOrder)
router.get('/get-all-details-order/:id', authUserMiddleware, getAllOrderDetails)
export default router 