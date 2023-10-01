import { createUserService, loginUserService, updateUserService, deleteUserService } from '../services/userService.js'

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const respone = await createUserService(req.body)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }

        const respone = await loginUserService(req.body)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required to update'
            })

        }
        // console.log('userId', userId)
        const respone = await updateUserService(userId, data)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const token = req.headers
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required to delete'
            })

        }
        // console.log('userId', userId)
        const respone = await deleteUserService(userId)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}
export { createUser, loginUser, updateUser , deleteUser}
