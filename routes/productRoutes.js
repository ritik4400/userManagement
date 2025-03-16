const express = require('express');
const router = express.Router();
const { validateToken , authorizeRoles } = require('../middleware/authMiddleware')

//product routes
const { addProduct  , getAllProducts , getTopExpensiveProducts , getProductCategoryCount , getProductsByCategory , getHighratedProduct} = require('../controller/productController/productController');
router.post('/addProduct' , addProduct)
router.get('/fetchProducts' ,  getAllProducts)
router.get('/fetchExpensiveProducts' ,  getTopExpensiveProducts)
router.get('/fetchProductCategoryCount' ,  getProductCategoryCount)
router.get('/fetchProductsByCategory/:category' ,  getProductsByCategory)
router.get('/fetchHighratedProduct' ,  getHighratedProduct)

//fetch products
const { fetchAllproducts} = require('../controller/productController/fetchproducts')
router.get('/fetchAllProducts' ,  fetchAllproducts);


module.exports = router;