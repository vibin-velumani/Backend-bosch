const mongoose=require('mongoose')
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
      }, category:
      {
       type:String,
       required:true
      },
    });
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
  module.exports=mongoose.model('Order',orderSchema);