const express=require('express')
const router=express.Router()
const Order=require('../Routes/Order')

router.route('/placeorder').post(Order.placeorder)
router.route('/allorders').get(Order.allorders)

module.exports=router