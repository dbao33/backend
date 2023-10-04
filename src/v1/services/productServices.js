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

const getAllProductsService = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProducts = await Product.count()
            if (filter) {
                console.log('filter', filter)
                const labelFilter = filter[0]
                const allProductsFilter = await Product.find({ [labelFilter]: { '$regex': filter[1] } }).limit(limit).skip(limit * page)
                resolve({
                    status: 'OK',
                    message: 'All Products Filter',
                    data: allProductsFilter,
                    total: totalProducts,
                    pageCurrent: page + 1,
                    totalPages: Math.ceil(totalProducts / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductsSort = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'All Products Sort',
                    data: allProductsSort,
                    total: totalProducts,
                    pageCurrent: page + 1,
                    totalPages: Math.ceil(totalProducts / limit)
                })
            }
            const allProducts = await Product.find().limit(limit).skip(limit * page).sort(Product.rating)
            resolve({
                status: 'OK',
                message: 'All Products ',
                data: allProducts,
                total: totalProducts,
                pageCurrent: page + 1,
                totalPages: Math.ceil(totalProducts / limit)
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