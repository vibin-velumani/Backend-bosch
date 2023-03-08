const mongoose=require('mongoose')
const registerSchema=new mongoose.Schema({
    email: {
        type:String,
        require:true,
        unique:true
    }
    ,
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    ph:{
        type:String,
        require:false,
        default:""
    }
    ,address:{
        type:String,
        require:false,
        default:""
    },
    isAdmin:{
        type:Boolean,
        require:false,
        default:false

    }
})
module.exports=mongoose.model('User',registerSchema);