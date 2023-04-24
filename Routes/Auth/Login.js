const db=require('../../db')
const Register =require('../../Models/Registers')
const bcrypt=require('bcrypt')
const User=require('../../Models/Registers')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const userdata=await User.findOne({email:email})
        console.log("New User Login Request")
        if(userdata===null)
        {
            res.status(400).send("Email Not Found")
            return
        }
        const valid=await bcrypt.compare(password,userdata.password)
        if(valid===true)
        {
            
        const token=await jwt.sign({id:userdata._id},process.env.SECRET,{expiresIn:"1d"})
        res.cookie("jwt",token,{httpOnly:true})
             res.status(200).json({
                status:"success",
                details:userdata
             })
        }
        else {
            res.status(400).json({
                status: "error",
                data: {
                    message: "password dosen't match"
                }
            });
            return;
        }
    
       }
    catch(err){
        console.log(err)
       res.status(500).send("Something went wrong");
    }
}

exports.logout=async(req,res)=>{
  try{
    res.clearCookie('jwt');
    res.status(200).json({
        status:"success",
        data:{
            message:"loggedout successfully"
        }  })
    }
  catch(err){
    res.status(400).send("some thing wrong")
  }
}


exports.getadmin=async(req,res)=>{
    try
    {
        const data=await User.find({isAdmin:true});
        console.log(data)
        res.status(200).json({
            status:"success",
            details:data
        })
    }
    catch(err)
    {
        res.status(500).send("Some thing went wrong in get admin");
        console.log("Some thing went wrong in get admin");
    }
}

exports.addadmin=async(req,res)=>{
    try
    {
        const {email,status}=req.body
        const data=await User.updateOne({email:email},{$set:{isAdmin:status}});
        console.log("data : "+data)
        res.status(200).json({
            status:"success"
        })
    }
    catch(err)
    {
        
        res.status(500).send("Some thing went wrong in add admin");
        console.log("Some thing went wrong in add admin");
    }
}

exports.getdetails=async(req,res)=>{
    try
    {
        const {id}=req.body;
         const data=await User.findOne({_id:id});
         res.status(200).json({
            status:"success",
            details:data
        })
    }
    catch(err)
    {
        res.status(500).send("Some thing went wrong in add admin");
    }
}
exports.updateCart = async (req, res) => {
    try {
      const { id, cart,total } = req.body;
      const user = await User.findById(id);
      
      const ud=await User.findOneAndUpdate({_id:id},{$set:{cartValue:total}})
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
      user.cart = cart;
      await user.save();
      const u = await User.findById(id);
      res.status(200).json({
        status: 'success',
        message: 'Cart updated successfully',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
  };

  exports.addcart = async (req, res) => {
    try {
      const { id, item } = req.body;
     console.log(item)
      const user = await User.findOneAndUpdate(
        { _id: id, "cart.productId": { $ne: item.productId } },
        { $push: { cart: item } },
        { new: true }
      );
       
      if (!user) {
        res.status(404).json({ status: 'error', message: 'User not found' });
        return;
      }

      if (user.cart.length === search.cart.length) {
          res.status(200).json({ status: 'error', message: 'Item already exists in cart' });
          return;
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Item added to cart successfully',
      });
      return;
    } 
    catch (err) {
      res.status(500).json({ status: 'error', message: 'Something went wrong',error:err });
    }
  };
  exports.cleancart = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        const user = await User.findOneAndUpdate(
          { _id: id },
          { $set: { cart: [] } },
          { new: true }
        );
        
        await User.findById(id,{$set:{cartValue:0}})
        console.log(user)
        if (!user) {
          return res.status(404).json({ status: 'error', message: 'User not found' });
        } 
    
        res.status(200).json({
          status: 'success',
          message: 'All items removed from cart successfully',
          user: user,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
      }
  };
exports.updatedetails=async(req,res)=>{
  try {
    const { id, upd } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set:  upd  }
    );
    console.log(user);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Updated successfully',
      details: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
}

exports.changepass=async(req,res)=>{
  try{
    const {id,oldpass,password}=req.body;
    const userdata=await User.findOne({_id:id})
    if(userdata===null)
    {
        res.status(400).send("Not Found")
        return
    }
    const valid=await bcrypt.compare(oldpass,userdata.password)
    if(valid===true)
    {
      const hashpassword=await bcrypt.hash(password,10);
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set:  {password:hashpassword}  }
      );
  
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'Some thing wrong internally ' });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Updated successfully',
        details: user,
      });
    }
    else {
        res.status(400).json({
            status: "error",
            data: {
                message: "password dosen't match"
            }
        });
        return;
    }

   }
catch(err){
   res.status(500).send("Something went wrong");
}
}

exports.addaddress=async(req,res)=>{
  try
  {
        const {id,item,deliveryChoice}=req.body;
        const user = await User.findOneAndUpdate(
          { _id: id } ,
          { $push: { shipping: item } ,$set:{deliveryChoice}},
          { new: true }
        );
        if (!user) {
          res.status(404).json({ status: 'error', message: 'User not found' });
          return;
        }
  
        res.status(200).json({
          status: 'success',
          message: 'Address added successfully',
        });
        return;

  }
  catch(err)
  {
   res.status(500).send("Something went wrong");
  }
}