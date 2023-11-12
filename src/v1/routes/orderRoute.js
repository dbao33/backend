import express from 'express'
import {
    createOrder, getOrderDetails, getAllOrderDetails,
    cancelOrder,
<<<<<<< HEAD
    getAllOrder
=======
>>>>>>> 6605989e0dda8790394e6433933af1b501863104
} from '../controllers/orderController.js'

import { authMiddleware, authUserMiddleware } from '../middlerwares/authMiddlerware.js'


const router = express.Router()

router.post('/create-order', authUserMiddleware, createOrder)
router.get('/get-order-details/:id', getOrderDetails)
router.get('/get-all-order-details/:id', authUserMiddleware, getAllOrderDetails)
router.delete('/cancel-order/:id', authUserMiddleware, cancelOrder)
router.get('/get-all-order', authMiddleware, getAllOrder)


export default router 