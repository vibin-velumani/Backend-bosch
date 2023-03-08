const express=require('express')
const router=express.Router()
const Login=require('../Routes/Auth/Login')
const Sign=require('../Routes/Auth/Sign')
router.route('/login').post(Login.login)
router.route('/logout').post(Login.logout)

router.route('/signin').post(Sign.sign)
module.exports=router