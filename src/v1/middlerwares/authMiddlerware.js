import jwt from 'jsonwebtoken'
import 'dotenv/config'
const authMiddleware = (req, res, next) => {
    // const token = req.headers.authorization // Giả sử token được truyền qua header Authorization
    console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    // verify a token symmetric
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(400).json({
                message: 'The authenticated user',
                status: 'error'
            })
        }
        const { payload } = user
        if (payload.isAdmin) {
            next()
        } else {
            return res.status(400).json({
                message: 'The authenticated user',
                status: 'error'
            })
        }
    })
}
export { authMiddleware }