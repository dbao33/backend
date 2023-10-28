import express from 'express'
import {
    createOrder,
} from '../controllers/orderController.js'
import { authUserMiddleware } from '../middlerwares/authMiddlerware.js'


const router = express.Router()

router.post('/create', authUserMiddleware, createOrder)


export default router 