import express from 'express'
import { createUser, loginUser } from '../controllers/userController.js'

const router = express.Router()
router.route('/sign-up').post(createUser)
router.route('/sign-in').post(loginUser)
// router.get('/', userController.createUser)
// router.route('/', createUser)
export default router 