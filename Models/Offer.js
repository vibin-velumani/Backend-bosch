const mongoose=require('mongoose')

const offerSchema=new mongoose.Schema(
    {
       pname:{
        type:String,
        required:true
       },
       offerdd:{
        type:Date,
        required:true
       }
       ,
       offerper:{
        type:Number,
        required:true
       }
       ,
       
       offerdueTime:{
        type:Number,
        
       }
    }
)
module.exports=mongoose.model('Offers',offerSchema)