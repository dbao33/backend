import {
    createUserService, loginUserService, updateUserService, deleteUserService,
    getAllUsersService, getDetailsService, deleteManyUsersService
} from '../services/userService.js'
import { refreshTokenService } from '../services/jwtService.js'

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
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
        const response = await createUserService(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        // console.log(email, password)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }

        const response = await loginUserService(req.body)
        const { refresh_token, ...newReponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        // console.log('response', response)
        return res.status(200).json(newReponse)
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
        const response = await updateUserService(userId, data)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required to delete'
            })

        }
        // console.log('userId', userId)
        const response = await deleteUserService(userId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const response = await getAllUsersService()
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required to delete'
            })

        }
        // console.log('userId', userId)
        const response = await getDetailsService(userId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })

        }
        // console.log('userId', userId)
        const response = await refreshTokenService(token)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const logOutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })

    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const deleteManyUsers = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids Users is required to delete'
            })

        }
        const respone = await deleteManyUsersService(ids)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

export {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getDetailsUser,
    refreshToken,
    logOutUser,
    deleteManyUsers,

}
