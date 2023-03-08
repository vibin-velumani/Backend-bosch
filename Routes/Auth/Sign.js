const bcrypt=require('bcrypt')
const User =require('../../Models/Registers')
const db=require('../../db')
exports.sign=async(req,res)=>{
        try
        { 
        const {email,name,password}=req.body;

         const hashpassword=await bcrypt.hash(password,10);
           console.log("New User Request")
         const newUser=new User({
            email:email,name:name,password:hashpassword
         })

         const r=await newUser.save()
         res.status(200).json({
            status: "success",
            data: {
                message: "Successfully registered user",
            }
         })
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send("Error");
        }
}