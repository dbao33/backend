import express from 'express'
import {
    createOrder, getOrderDetails, getAllOrderDetails,
    cancelOrder,
} from '../controllers/orderController.js'

import { authUserMiddleware } from '../middlerwares/authMiddlerware.js'


const router = express.Router()

router.post('/create-order', authUserMiddleware, createOrder)
router.get('/get-order-details/:id', getOrderDetails)
router.get('/get-all-order-details/:id', authUserMiddleware, getAllOrderDetails)
router.delete('/cancel-order/:id', authUserMiddleware, cancelOrder)


export default router 