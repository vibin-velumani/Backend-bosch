const express=require('express');
const db=require('../db')
const User=require('../Models/Registers')
const Product = require('../Models/Products');
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
              const {name,price,quantity,category,desc,preimg,offer,offerdd,offerper,offerduetime}=req.body;
              if(offer)
              {
                
              const prod=new Product({
               name,price,quantity,category,desc,preimg,offer,offerdd,offerper,offerduetime
                          })
                 const a1=await prod.save()
            
                }
                else
                {
                    
              const prod=new Product({
                name,price,quantity,category,desc,preimg,offer
                           })
                  const a1=await prod.save()
                }
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
        const {name,price,quantity,category,desc,id,preimg,offer,offerdd,offerper,offerduetime}=req.body;
        if(offer)
        {
         const prod=await Product.updateOne({_id:id},{$set:{name,price,quantity,category,desc,preimg,offer,offerdd,offerper,offerduetime}})
        }
        else
        {
            const prod=await Product.updateOne({_id:id},{$set:{name,price,quantity,category,desc,preimg,offer}})
        }
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


exports.getcartdetails=async(req,res)=>
{
    try{
        const {id}=req.body;
         const u=await User.findOne({_id:id})    
           res.status(200).json({
            status: "success",
            data:u
         })
         return;
    }
catch(err)
{
   res.status(500).json({data:"Something went wrong",err})
}

}

exports.getproductdetails=async(req,res)=>{
    try{

        const {pid}=req.body;
        const p=await Product.findOne({_id:pid});
        res.status(200).json({
            data:p
        })

    }
    catch(err)
    {
        res.status(500).json({
            err
        })
    }
}
exports.offer=async(req,res)=>{
    try{
          
        const products=await Product.find({offer:true});
        res.status(200).json({
         status:"success",
         data:products
     });
     return;
    }catch(err)
       {
            res.status(500).send("Something went wrong")
            return
       }
   
   
   }