const mongoose=require('mongoose')

const productSchema=new mongoose.Schema(
    {
       name:{
        type:String,
        required:true
       },
       price:{
        type:Number,
        required:true
       }
       ,
       desc:{
        type:String,
        required:true
       }
       ,
       preimg:{
        data:Buffer,
        contentType:String
       },
       category:
       {
        type:String,
        required:true
       },
       quantity:{
        type:String,
        required:true
       },
       stars:{
        type:String,
       }
       
    }
)
module.exports=mongoose.model('Product',productSchema)