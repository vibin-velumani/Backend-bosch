const express=require('express')
const router=express.Router()
const Staffs=require('../Routes/Staffs')

router.route('/addstaff').post(Staffs.addstaff)






module.exports=router