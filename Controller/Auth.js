const express=require('express')
const router=express.Router()
const Login=require('../Routes/Auth/Login')
const Sign=require('../Routes/Auth/Sign')
router.route('/login').post(Login.login)
router.route('/logout').post(Login.logout)
router.route('/alladmin').get(Login.getadmin)
router.route('/addadmin').post(Login.addadmin)
router.route('/userdetails').post(Login.getdetails)
router.route('/updateDetails').post(Login.updatedetails)
router.route('/changepass').post(Login.changepass)



router.route('/updatecart').post(Login.updateCart)
router.route('/addcart').post(Login.addcart)
router.route('/cleancart').post(Login.cleancart)


router.route('/signin').post(Sign.sign)
module.exports=router