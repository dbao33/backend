import express from 'express'
import {
    createOrder, getOrderDetails, getAllOrderDetails,
    cancelOrder,
    getAllOrder
} from '../controllers/orderController.js'

import { authMiddleware, authUserMiddleware, auth } from '../middlerwares/authMiddlerware.js'


const router = express.Router()

router.post('/create-order', auth, createOrder)
router.get('/get-order-details/:id', getOrderDetails)
router.get('/get-all-order-details/:id', authUserMiddleware, getAllOrderDetails)
router.delete('/cancel-order/:id', authUserMiddleware, cancelOrder)
router.get('/get-all-order', authMiddleware, getAllOrder)


export default router 