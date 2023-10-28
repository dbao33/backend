import userRouter from './userRouter.js'
import productRouter from './productRoute.js'
import orderRouter from './orderRoute.js'
import paymentRouter from './PaymentRoute.js'

const routes = (app) => {
    app.use('/v1/api/user', userRouter)
    app.use('/v1/api/product', productRouter)
    app.use('/v1/api/order', orderRouter)
    app.use('/v1/api/payment', paymentRouter)
}
export default routes