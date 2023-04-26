const express = require("express")
const app = express()
require('dotenv').config()
const Auth=require('./Controller/Auth')
const Product=require('./Controller/Product')
const Orders=require('./Controller/Orders')

const Offers=require('./Controller/Offers')
const Staffs=require('./Controller/Staffs')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://crystal-parts.web.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
require('./db')
app.use(express.static('Public'))
const cors=require('cors')
const cookieParser = require("cookie-parser")
app.use(
    cors({
      credentials: true,
      origin: ["https://crystal-parts.web.app/", "https://crystal-parts.firebaseapp.com/", "http://localhost:3000", "https://crystalparts.rido.live"],
    })
  );
  app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/auth',Auth)
app.use('/order',Orders)

app.use('/product',Product)
app.use('/offers',Offers)
app.use('/staff',Staffs)




// app.use('/products',products)
app.listen(9000,()=>{
    console.log("Running...")
})
// const con=mongoose.connection
// con.on('open',function()
// {
//     console.log("Connected ...")
// }