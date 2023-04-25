const mongoose=require('mongoose')

const staffSchema=new mongoose.Schema(
    {
        sname:{
            type:String,
            required:true
           },
           email:{
            type:String,
            require:true
           },
           ph:{
             type:String,
             require:false,
              default:""
            },
            DOB:{
             type:Date,
              require:false
           },
           address:{
            type:String,
            require:false,
            default:""
           },
           DOJ:{
            type:Date,
             require:true
           },
           currsal:{
            type:Number,
            required:true
           }
    }
)
module.exports=mongoose.model('Staffs',staffSchema)