const express=require('express')
const router=express.Router()
const Staffs=require('../Routes/Staffs')

router.route('/addstaff').post(Staffs.addstaff)

router.route('/viewstaff').post(Staffs.viewstaff)





module.exports=router