const express=require('express')
const router=express.Router()
const Order=require('../Routes/Order')

router.route('/placeorder').post(Order.placeorder)
router.route('/allorders').get(Order.allorders)
router.route('/update').post(Order.update)
router.route('/findordercount').post(Order.findOrderCount)
router.route('/orderdetails').post(Order.orderDetails)



module.exports=router