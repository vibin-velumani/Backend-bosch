const mongoose=require('mongoose')
const orderSchema = new mongoose.Schema({
   
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now,
      },
      total:{
        type:Number,
        required:true
      }
  });
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

    },
    
    proimg:{
        type:String
       },
    status:{
        type:Boolean,
        require:false,
        default:false
    },
    orders: [orderSchema] // include orders as a property
})
module.exports=mongoose.model('User',registerSchema);