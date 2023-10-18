import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { genneralAccessToken, genneralRefreshToken } from './jwtService.js'
const createUserService = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already in use'
                })
            }
            const hash = await bcrypt.hashSync(password, 12);
            const createUser = await User.create({
                name,
                email,
                password: hash
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }

        } catch (err) {
            reject(err)
        }
    })
}
const loginUserService = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not exist'
                })
            }
            const comparePassword = await bcrypt.compareSync(password, checkUser.password)
            // console.log('comparePassword', comparePassword)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The user or password is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            // console.log('accessToken', access_token)
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })

        } catch (err) {
            reject(err)
        }
    })
}

const updateUserService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not exist'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            // console.log('updateUser', updateUser)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser
            })

        } catch (err) {
            reject(err)
        }
    })
}

const deleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not exist'
                })
            }
            await User.findByIdAndDelete(id)
            // console.log('updateUser', updateUser)
            resolve({
                status: 'OK',
                message: 'Delete user success'
            })

        } catch (err) {
            reject(err)
        }
    })
}

const getAllUsersService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const allUsers = await User.find()
            // console.log('updateUser', updateUser)
            resolve({
                status: 'OK',
                message: 'All user ',
                data: allUsers
            })

        } catch (err) {
            reject(err)
        }
    })
}

const getDetailsService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not exist'
                })
            }
            resolve({
                status: 'OK',
                message: 'Find user success',
                data: checkUser
            })

        } catch (err) {
            reject(err)
        }
    })
}

export {
    createUserService,
    loginUserService,
    updateUserService,
    deleteUserService,
    getAllUsersService,
    getDetailsService
}