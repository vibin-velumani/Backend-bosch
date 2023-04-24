const express = require("express")
const app = express()
require('dotenv').config()
const Auth=require('./Controller/Auth')
const Product=require('./Controller/Product')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
require('./db')
app.use(express.static('Public'))
const cors=require('cors')
const cookieParser = require("cookie-parser")
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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