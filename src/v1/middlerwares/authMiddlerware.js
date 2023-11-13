import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authMiddleware = (req, res, next) => {
   
    // console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    // const token = req.headers.token.split(' ')[1]
    // verify a token symmetric
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(400).json({
                message: 'The authenticated user',
                status: 'error'
            })
        }

        if (user?.isAdmin) {
            next()
        } else {
            return res.status(400).json({
                message: 'The authenticated user',
                status: 'error'
            })
        }
    })
}

const authUserMiddleware = (req, res, next) => {
    // console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    // const token = req.headers.token
    const userId = req.params.id

    // verify a token symmetric
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(400).json({
                message: 'The authenticated user',
                status: 'error'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(400).json({
                message: 'The authenticated user',
                status: 'error'
            })
        }
    })
}

const auth = (req, res, next) => {

    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(400).json({
                message: 'The authenticated user',
                status: 'error'
            })
        }
        if (user) {
            next()
        } else {
            return res.status(400).json({
                message: 'The authenticated user',
                status: 'error'
            })
        }

    })
}
export {
    authMiddleware,
    authUserMiddleware,
    auth
}