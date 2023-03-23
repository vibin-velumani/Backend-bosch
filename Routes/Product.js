const express=require('express');
const db=require('../db')

const Product = require('../Models/products');

exports.getallproducts=async(req,res)=>{
 try{
       
     const products=await Product.find({});
     res.status(200).json({
      status:"success",
      data:{
          message:"successfully got all questions",
          products
      }
  });
  return;
 }catch(err)
    {
         res.status(500).send("Something went wrong")
         return
    }


}

exports.addproduct=async(req,res)=>{
    
         
         try{
              const {name,price,quantity,category,desc,preimg}=req.body;
              const prod=new Product({
               name,price,quantity,category,desc,preimg
                          })
                 const a1=await prod.save()
                 res.status(200).json({
                  status: "success",
                  data: {
                      message: "Successfully Added product",
                  }
               })
          }
    catch(err)
    {
         res.status(500).send("Something went wrong")
    }
}

exports.updateproduct=async(req,res)=>{
    try{
        const {name,price,quantity,category,desc,id}=req.body;
         const prod=await Product.updateOne({_id:id},{$set:{name,price,quantity,category,desc}})
           res.status(200).json({
            status: "success",
            data: {
                message: "Successfully Updated Product",
            }
         })
         return;
    }
catch(err)
{
   res.status(500).send("Something went wrong")
}

}

exports.removeproduct=async(req,res)=>{
    try{
        const {id}=req.body;
         const prod=await Product.deleteOne({_id:id})
         
    
           res.status(200).json({
            status: "success",
            data: {
                message: "Successfully Removed Product",
            }
         })
         return;
    }
catch(err)
{
   res.status(500).send("Something went wrong")
}

}
