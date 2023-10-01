import express from 'express'
import { createUser, loginUser, updateUser, deleteUser } from '../controllers/userController.js'
import { authMiddleware } from '../middlerwares/authMiddlerware.js'
const router = express.Router()
router.route('/sign-up').post(createUser)
router.route('/sign-in').post(loginUser)
router.route('/update-user/:id').put(updateUser)
router.route('/delete-user/:id').delete(authMiddleware, deleteUser)
// router.route('/getAll-user/:id').get(getAllUser)
export default router 