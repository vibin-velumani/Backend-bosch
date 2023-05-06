const express=require('express');
const db=require('../db')

const Offer = require('../Models/Offer');

exports.addoffers=async(req,res)=>{
    
     try{
         const {name,offPer,offerdd,offerduetime}=req.body;
         console.log("working :"+offerduetime)
         const off=new Offer({
            pname:name,offerper:offPer,offerdd,offerduetime
                     })
            const a1=await off.save()
            res.status(200).json({
             status: "success",
             data: {
                 message: "Offer is added",
             }
          })
     }
catch(err)
{
    res.status(500).json({err})
}
}