const express=require('express');
const products = require('../Models/products');
const router=express.Router()

router.get('/',async(req,res)=>{
     try{
         const prods=await products.find()
         res.json(prods)
     
        }
     catch(err){
        res.send("Something went wrong");
     }
})
router.post('/',async(req,res)=>{
    
         const prod=new products({
            name:req.body.name,
            price:req.body.price
         }) 
         try{
                 const a1=await prod.save()
         res.json(a1)
          }
    catch(err)
    {
         res.send("Something went wrong")
    }
})
module.exports=router;