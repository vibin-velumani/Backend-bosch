const express=require('express')
const router=express.Router()
const Offers=require('../Routes/Offers')

router.route('/addoffers').post(Offers.addoffers)






module.exports=router