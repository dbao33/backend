import express from 'express'
import { createUser } from '../controllers/userController.js'

const router = express.Router()
router.route('/').post(createUser)
// router.get('/', userController.createUser)
// router.route('/', createUser)
export default router 