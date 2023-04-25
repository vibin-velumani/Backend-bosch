
const express = require('express');
const db=require('../db')

const stf = require('../Models/Staffs');

exports.addstaff=async(req,res)=>{
    
     try{
         const {name,email,ph,DOB,address,DOJ,currsal}=req.body;
         console.log(name)
         const ad_stf=new stf({
            sname:name,email,ph,DOB,address,DOJ,currsal
                     })
            const a1=await ad_stf.save()
            res.status(200).json({
             status: "success",
             data: {
                 message: "Offer is added",
             }
          })
     }
catch(err)
{
    console.log(err)
    res.status(500).json({err})
}
}



