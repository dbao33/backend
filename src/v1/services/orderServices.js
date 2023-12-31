import Order from '../models/oderProduct.js'
import Product from '../models/productModel.js'

const createOrderService = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, deliveredMethod, itemsPrice, shippingPrice, totalPrice,
            fullName, address, city, phone, user, isPaid, paidAt } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {

                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }

                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {

                resolve({
                    status: 'ERR',
                    message: `San pham voi id ${newData.map((item) => item.id).join(', ')} khong du hang`
                })
            } else {
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city, phone
                    },
                    paymentMethod,
                    deliveredMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid,
                    paidAt
                })
                if (createdOrder) {
                    resolve({
                        status: 'OK',
                        message: 'Order success'
                    })
                }
            }
        } catch (err) {
            reject(err)
        }
    })
}

const getOrderDetailsService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (err) {
            reject(err)
        }
    })
}

const getAllOrderDetailsService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        }
        catch (err) {
            reject(err)
        }
    }
    )
}

const cancelOrderService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        selled: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            selled: -order.amount
                        }
                    },
                    { new: true }
                )
                // console.log('productData', productData)
                if (productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })

            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id ${newData.map((item) => item.id).join(', ')} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'Cancel order success',
                data: order
            })
        } catch (err) {
            reject(err)
        }
    })
}

const getAllOrderService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}


export {
    createOrderService,
    getOrderDetailsService,
    getAllOrderDetailsService,
    cancelOrderService,
    getAllOrderService,


}