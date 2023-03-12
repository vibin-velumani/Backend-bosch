const express = require("express")
const app = express()
require('dotenv').config()
const Auth=require('./Controller/Auth')
const Product=require('./Controller/Product')

const mongoose=require('mongoose')
require('./db')
const cors=require('cors')
const cookieParser = require("cookie-parser")
app.use(cors())
app.use(express.json())

app.use('/auth',Auth)

app.use('/product',Product)






// app.use('/products',products)
app.listen(9000,()=>{
    console.log("Running...")
})
// const con=mongoose.connection
// con.on('open',function()
// {
//     console.log("Connected ...")
// }