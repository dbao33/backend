import {
    createOrderService,
} from '../services/orderServices.js'

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
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

export {
    createOrder,

}