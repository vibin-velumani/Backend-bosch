const express=require('express')
const router=express.Router()
const Product=require('../Routes/Product')

router.route('/addproduct').post(Product.addproduct)
router.route('/getallproducts').get(Product.getallproducts)
router.route('/updateproduct').post(Product.updateproduct)
router.route('/removeproduct').post(Product.removeproduct)





module.exports=router