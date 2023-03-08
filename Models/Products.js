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
        type:String
       }
       ,img:{
        data:Buffer,
        contentType:String
       },
       type:
       {
        type:String,
        required:true
       }
       
    }
)
module.exports=mongoose.model('Product',productSchema)