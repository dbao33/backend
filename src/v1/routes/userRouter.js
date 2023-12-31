import express from 'express'
import {
    createUser, loginUser, updateUser,
    deleteUser, getAllUsers, getDetailsUser,
    refreshToken, logOutUser, deleteManyUsers
} from '../controllers/userController.js'
import { authMiddleware, authUserMiddleware } from '../middlerwares/authMiddlerware.js'
const router = express.Router()
router.route('/sign-up').post(createUser)
router.route('/sign-in').post(loginUser)
router.post('/log-out', logOutUser)
router.route('/update-user/:id').put(authUserMiddleware, updateUser)
router.route('/delete-user/:id').delete(authMiddleware, deleteUser)
router.route('/get-all-users/').get(authMiddleware, getAllUsers)
router.route('/get-details-user/:id').get(authUserMiddleware, getDetailsUser)
router.route('/refresh-token').post(refreshToken)
router.route('/delete-many-users').post(authMiddleware, deleteManyUsers)

export default router 