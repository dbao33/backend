import {
    createOrderService, getOrderDetailsService, getAllOrderDetailsService,
    cancelOrderService,
    getAllOrderService,
} from '../services/orderServices.js'

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, deliveredMethod, itemsPrice, shippingPrice, totalPrice,
            fullName, address, city, phone } = req.body
        if (!paymentMethod || !itemsPrice || shippingPrice === null ||
            !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await createOrderService(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await getOrderDetailsService(userId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await getAllOrderDetailsService(userId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const data = req.body
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await cancelOrderService(orderId, data)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await getAllOrderService()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e.message
        })
    }
}


export {
    createOrder,
    getOrderDetails,
    getAllOrderDetails,
    cancelOrder,
    getAllOrder,


}