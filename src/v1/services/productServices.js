import Product from '../models/productModel.js'

const createProductService = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price,
            countInStock, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already in use'
                })
            }
            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            })
            if (createProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createProduct
                })
            }

        } catch (err) {
            reject(err)
        }
    })
}

const updateProductService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            // console.log('checkProduct', checkProduct)
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The Product is not exist'
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            // console.log('updateProduct', updateProduct)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })

        } catch (err) {
            reject(err)
        }
    })
}
const getDetailsProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            // console.log('checkProduct', checkProduct)
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The Product is not exist'
                })
            }
            resolve({
                status: 'OK',
                message: 'Find Product success',
                data: checkProduct
            })

        } catch (err) {
            reject(err)
        }
    })
}

const deleteProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            // console.log('checkProduct', checkProduct)
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The Product is not exist'
                })
            }
            await Product.findByIdAndDelete(id)
            // console.log('updateProduct', updateProduct)
            resolve({
                status: 'OK',
                message: 'Delete Product success'
            })

        } catch (err) {
            reject(err)
        }
    })
}

const getAllProductsService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const allProducts = await Product.find()
            // console.log('updateProducts', updateProducts)
            resolve({
                status: 'OK',
                message: 'All Products ',
                data: allProducts
            })

        } catch (err) {
            reject(err)
        }
    })
}

export {
    createProductService,
    updateProductService,
    getDetailsProductService,
    deleteProductService,
    getAllProductsService
}