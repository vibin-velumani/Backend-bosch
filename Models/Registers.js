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
    },
    total:{
      type:Number
    },preimg:{
      type:String
    } ,category:
    {
     type:String,
     required:true
    },
  });
const shippingAddress=new mongoose.Schema({
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
},city:{
type:String,
require:false,
default:""
},
landmark:{
type:String,
require:false,
default:""
},
zipcode:{
type:String,
require:false,
default:""
},name:{
  type:String,
require:false,
default:""
}
})
const orderSchema = new mongoose.Schema({
    shipping:shippingAddress,
    cart: [cartSchema] ,
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now,
      }
      ,
    paymentstatus:{
      type:String,
      require:true,
      default:"pending"
    },
    cartValue:{
      type:Number,
      require:true,
    },
    paymenttype:{
      type:String,
      require:true,
      default:"COD"
    },
    orderstatus:{
      type:String,
      require:true,
      default:"Processing"
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
    cartValue:{
      type:Number,
      require:true,
      default:0
    }
    ,
    orders: [orderSchema] ,// include orders as a property

    cart: [cartSchema] ,

    shipping:[shippingAddress],
    deliveryChoice:{
      type:Number,
      require:true,
      default:-1
    }
})
module.exports=mongoose.model('User',registerSchema);