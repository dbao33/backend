import express from 'express'
import {
    createUser, loginUser, updateUser,
    deleteUser, getAllUser, getDetailsUser,
    refreshToken
} from '../controllers/userController.js'
import { authMiddleware,authUserMiddleware } from '../middlerwares/authMiddlerware.js'
const router = express.Router()
router.route('/sign-up').post(createUser)
router.route('/sign-in').post(loginUser)
router.route('/update-user/:id').put(updateUser)
router.route('/delete-user/:id').delete(authMiddleware, deleteUser)
router.route('/getAll-user/').get(authMiddleware, getAllUser)
router.route('/get-details-user/:id').get(authUserMiddleware, getDetailsUser)
router.route('/refresh-token').post(refreshToken)
export default router 