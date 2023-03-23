const db=require('../../db')
const Register =require('../../Models/Registers')
const bcrypt=require('bcrypt')
const User=require('../../Models/Registers')
const jwt=require('jsonwebtoken')
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
         const data=await User.findOne({user_id:req.body.id});
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