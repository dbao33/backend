import express from 'express'
import {
    createProduct, updateProduct, getDetailsProduct,
    deleteProduct, getAllProducts, deleteManyProducts,
    getAllTypes, getSearchProducts
} from '../controllers/productController.js'

import { authMiddleware } from '../middlerwares/authMiddlerware.js'
const router = express.Router()
router.route('/create-product').post(createProduct)
router.route('/update-product/:id').put(authMiddleware, updateProduct)
router.route('/delete-product/:id').delete(authMiddleware, deleteProduct)
router.route('/get-details-product/:id').get(getDetailsProduct)
router.route('/get-all-products/').get(getAllProducts)
router.route('/delete-many-products').post(authMiddleware, deleteManyProducts)
router.route('/get-all-types/').get(getAllTypes)
router.route('/search').get(getSearchProducts)
export default router 