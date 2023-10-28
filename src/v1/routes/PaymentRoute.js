import express from 'express'
import 'dotenv/config'


const router = express.Router()


router.get('/config', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        data: process.env.CLIENT_ID
    })
})


export default router 