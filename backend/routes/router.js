const express = require('express')
const router = new express.Router()
const controller = require('../controller/productController')

router.post('/products', controller.getProducts)
router.post('/add/product', controller.postProduct)



module.exports = router

// const product = 