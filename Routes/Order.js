const express=require('express');
const db=require('../db')

const Order=require("../Models/Order")
const User=require('../Models/Registers')

exports.placeorder=async(req,res)=>{
    try{
           const {uid,payment,address,value}=req.body;
           const userdata=await User.findOne({_id:uid});
           console.log(value);
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