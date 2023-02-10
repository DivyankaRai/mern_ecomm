const express = require('express')
const router = new express.Router()
const upload = require("../multerconfig/storageconfig")
const controller = require('../controller/productController')
const usercontroller = require('../controller/userController')


//  product routes
router.get('/products', controller.getProducts)
router.post('/add/product', controller.postProduct)
router.put('/update/product/:id', controller.updateProduct)
router.delete('/delete/product/:id', controller.deleteProduct)

// user routes
router.post("/user/register",upload.single("user_profile"),usercontroller.registerUser)
router.post("/user/login", usercontroller.loginUser)

module.exports = router
