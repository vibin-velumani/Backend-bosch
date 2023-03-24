const mongoose=require('mongoose')
const cartSchema = new mongoose.Schema({
  productId: {
    type:String,
    required: true,
  },
      productname: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    }
  });
const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
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
    DOB:{
         type:Date,
         require:false
    },
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
    },state:{
      type:String,
      require:false,
      default:""
  },country:{
    type:String,
    require:false,
    default:""
},
    isAdmin:{
        type:Boolean,
        require:false,
        default:false

    },
    verified:{
      type:Boolean,
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
    orders: [orderSchema] ,// include orders as a property

    cart: [cartSchema]
})
module.exports=mongoose.model('User',registerSchema);