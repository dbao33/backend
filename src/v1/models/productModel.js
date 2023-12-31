import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        hardDrive: { type: String, required: true },
        cpu: { type: String, required: true },
        ram: { type: String, required: true },
        monitor: { type: String, required: true },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number }
    },
    {
        timestamps: true,
    }

)
const Product = mongoose.model('Product', productSchema)

export default Product