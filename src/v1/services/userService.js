import User from '../models/userModel.js'

const createUserService = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already in use'
                })
            }
            const createUser = await User.create({
                name,
                email,
                password,
                confirmPassword,
                phone
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
export { createUserService }