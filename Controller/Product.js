const express=require('express')
const router=express.Router()
const Product=require('../Routes/Product')
const uploadMiddleware=require('../Middleware/MulterMiddleware')
router.route('/addproduct').post(Product.addproduct)
router.route('/getallproducts').get(Product.getallproducts)
router.route('/updateproduct').post(Product.updateproduct)
router.route('/removeproduct').post(Product.removeproduct)
router.route('/getproductdetails').post(Product.getproductdetails)
router.route('/offers').get(Product.offer)




module.exports=router