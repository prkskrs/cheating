import User from "../models/User.js"
import bigPromise from "../middlewares/bigPromise.js"
import { cookieToken } from "../utils/cookieToken.js";

export const createAdmin = bigPromise(async(req,res,next)=>{
    const {name , email , password,role}=req.body;
    console.log(name)
    if(!email || !name || !password){
        return res.status(400).json({
            success:"false",
            message:"Name, Email and Password fields are required."
        })
    }

    const existingUser=await User.findOne({email});
    console.log(existingUser)
    if(existingUser){
        return res.status(400).json({
            success:"false",
            message:"User Already Exists"
        })
    }
    const user= await User.create({
        name,
        email:email.toLowerCase(),
        password:password,role
    })
    user.password=undefined
    cookieToken(user,res,"Registered Successfully!");

})

export const loginAdmin =bigPromise(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!(email && password)){
        return res.status(400).json({
            success:"false",
            message:"Email and Password fields are required."
        })
    }
    const user=await User.findOne({email:email})

    if(!user){
        return res.status(400).json({
            success:"false",
            message:"You're not registered in our app"
        })
    }


    const isPasswordCorrect=await user.isValidatedPassword(password, user.password)
    console.log(isPasswordCorrect)

    if(!isPasswordCorrect){
        return res.status(401).json({
            success:"false",
            message:"Incorrect Password"
        })
    }
    console.log("token")

    cookieToken(user,res,"LoggedIn Successfully!");

})


export const deleteUser=bigPromise(async(req,res,next)=>{

    const user= await User.findById(req.params.id)

    console.log(user)

    if(!user){
        return res.status(401).json({
            success:false,
            message:"No user found with this id "
        })
    }
    await user.remove()
    res.status(200).json({
        success:true,
        message:"User Deleted Succesfully!",
        user
    })
})


