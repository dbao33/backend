import express from 'express'
import {
    createOrder, getDetailsOrder,
} from '../controllers/orderController.js'

import { authUserMiddleware } from '../middlerwares/authMiddlerware.js'


const router = express.Router()

router.post('/create', authUserMiddleware, createOrder)
router.get('/get-details-order/:id', getDetailsOrder)

export default router 