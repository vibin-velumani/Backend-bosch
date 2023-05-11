const express=require('express');
const db=require('../db')
const nodemailer=require("nodemailer")
const Order=require("../Models/Order")
const User=require('../Models/Registers')
const Product = require('../Models/Products');
function sendmail(reciver, content) {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'agenmaruthi@gmail.com',
          pass: 'wuedwzppvsbrsamc'
      }
  });

  var mailOptions = {
      from: 'agenmaruthi@gmail.com',
      to: reciver,
      subject: 'Your Order Placed Successfully',
      html: content
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

exports.placeorder=async(req,res)=>{
    try{
           const {uid,payment,address,value}=req.body;
           const userdata=await User.findOne({_id:uid});
           const con = `
<html>
  <body>
    <p>Dear ${userdata.name},</p>
    <p>Thank you for placing an order with Crystal Parts.</p>
    <p>Your order details:</p>
    <ul>
      <li>Product: ${userdata.cart[0].productname}</li>
      <li>Price: ${userdata.cart[0].price}</li>
      <li>Quantity: ${userdata.cart[0].quantity}</li>
      <li>Total: ${userdata.cartValue}</li>
    </ul>
    <p>Thank you for shopping with us!</p>
  </body>
</html>
`;

           if(payment=="COD")
           {
        

            for (const cartItem of userdata.cart) {
              const productId = cartItem.productId;
              const quantity = cartItem.quantity;
              await Product.findOneAndUpdate({ _id: productId }, { $inc: { quantity: -quantity } });
            }
             const newOrder={
               shipping:address,
               cart:userdata.cart,
               cartValue:value  
             }
              const u=await User.findOneAndUpdate({_id:uid},{$push:{orders:newOrder},$set:{cartValue:0,cart:[]}})  
             const newSch=new Order({
                shipping:address,
                cart:userdata.cart,
                cartValue:userdata.cartValue
             })
             const re=newSch.save();
           }
           sendmail(userdata.email,con);
           res.json({data:"success"})
    }
    catch(err)
    {
        res.json({
            err
        })
    }
}
exports.allorders=async(req,res)=>{
  try{
         const userdata=await Order.find({});
         
         res.json({data:userdata})
  }
  catch(err)
  {
      res.json({
          err
      })
  }
}
exports.update=async(req,res)=>{
  try{
    const {id,orderstatus}=req.body;
         const userdata=await Order.findOneAndUpdate({_id:id},{$set:{orderstatus}});
         
         res.json({status:"success"})
  }
  catch(err)
  {
      res.json({
          err
      })
  }
}


exports.findOrderCount = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$shipping.state",
          count: { $sum: 1 }
        }
      }
    ]);
    const result2 = await Order.aggregate([
      {
        $unwind: "$cart"
      },
      {
        $group: {
          _id: "$cart.category",
          count: { $sum: 1 }
        }
      }
    ]);
    res.json({data:result,data3:result2});
  } catch (err) {
    res.json({
      err
    })
  }
}

exports.orderDetails = async (req, res) => {
  try {
    const result = await Order.find({});
    const result1 = await Order.find({orderstatus:"Delivered"});
    const users=await User.find({});

    var revenue=0;
    result.map((ord)=>{
      const offerDate = new Date(ord.purchaseDate);
              const now = new Date();
              const diff = now.getDate()-offerDate.getDate();
      if(diff<=31)
      {
        revenue+=ord.cartValue;
      }
    })
    res.json({total:result.length,delivered:result1.length,usercount:users.length,revenue});
  } catch (err) {
    res.json({
      err
    })
  }
}

