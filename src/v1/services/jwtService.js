import jwt from 'jsonwebtoken'
import 'dotenv/config'
const genneralAccessToken = async (payload) => {
    // console.log('payload', payload)
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '60s' }
    )
    return access_token
}
const genneralRefreshToken = async (payload) => {
    // console.log('payload', payload)
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' }
    )
    return refresh_token
}
const refreshTokenService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {

            // console.log('token', token)
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    })
                }
                // console.log('user', user)
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token: access_token
                })
            })

        } catch (err) {
            reject(err)
        }
    })
}
export {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenService
}