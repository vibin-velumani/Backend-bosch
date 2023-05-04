const express=require('express');
const db=require('../db')

const Order=require("../Models/Order")
const User=require('../Models/Registers')

exports.placeorder=async(req,res)=>{
    try{
           const {uid,payment,address,value}=req.body;
           const userdata=await User.findOne({_id:uid});
           if(payment=="COD")
           {
        
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
