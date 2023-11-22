import {
    createProductService, updateProductService, getDetailsProductService,
    deleteProductService, getAllProductsService, deleteManyProductsService,
    getAllTypesService
} from '../services/productServices.js'


const createProduct = async (req, res) => {
    try {
        const { name, image, type, price,
            countInStock, rating, description, discount, selled,
            hardDrive, cpu, ram, monitor } = req.body
        // console.log('req.body', req.body)
        if (!name || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }

        const respone = await createProductService(req.body)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const ProductId = req.params.id
        const data = req.body
        if (!ProductId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The Product is required to update'
            })

        }
        // console.log('ProductId', ProductId)
        const respone = await updateProductService(ProductId, data)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const Product = req.params.id
        if (!Product) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required to delete'
            })

        }
        // console.log('Product', Product)
        const respone = await getDetailsProductService(Product)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product is required to delete'
            })

        }
        // console.log('productId', productId)
        const respone = await deleteProductService(productId)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}
const getAllProducts = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const respone = await
            getAllProductsService(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const deleteManyProducts = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids Products is required to delete'
            })

        }
        const respone = await deleteManyProductsService(ids)
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

const getAllTypes = async (req, res) => {
    try {
        const respone = await getAllTypesService()
        return res.status(200).json(respone)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

export {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProducts,
    deleteManyProducts,
    getAllTypes,


}
