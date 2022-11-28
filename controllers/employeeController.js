import Employee from "../models/Employee.js"
import bigPromise from "../middlewares/bigPromise.js"


export const adminAddAnyEmployee = bigPromise(async(req,res,next)=>{
    const {name,ssn,salary,department,dob,doj}=req.body;
    console.log(name)
    if(!ssn || !name || !department){
        return res.status(400).json({
            success:"false",
            message:"Name, Price and Category fields are required."
        })
    }

    const existingEmployee=await Employee.findOne({name});
    console.log(existingEmployee)
    if(existingEmployee){
        return res.status(400).json({
            success:"false",
            message:"emp Already Exists"
        })
    }
    const emp= await Employee.create({
        name,
        ssn,
        salary,
        department,
        dob,
        doj
    })
    res.status(200).json({
        success:true,
        message:"emp added successfully!",
        emp
    })
})


export const adminDeleteAnyEmployee=bigPromise(async(req,res,next)=>{
    console.log(req.params.id);
    const emp= await Employee.findById(req.params.id)

    console.log(emp)

    if(!emp){
        return res.status(401).json({
            success:false,
            message:"No emp found with this id "
        })
    }
    await emp.remove()
    res.status(200).json({
        success:true,
        message:"emp Deleted Succesfully!",
        deletedemp:emp
    })
})

export const adminAllEmployee=bigPromise(async(req,res,next)=>{

    const emps= await Employee.find({})

    console.log(emps)

    if(!emps){
        return res.status(401).json({
            success:false,
            message:"No emps found "
        })
    }
    res.send(emps)
})


export const adminUpdateAnyEmployee=bigPromise(async(req,res,next)=>{
    const newData={
        name:req.body.name,   
        ssn:req.body.ssn,
        salary:req.body.salary,
        department:req.body.department,
        dob:req.body.dob,
        doj:req.body.doj
    }

    const userq = await Employee.findById(req.params.id)
    if(userq.salary<20000){
        const user = await Employee.findByIdAndUpdate(req.params.id,newData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
    }
    else{
        return res.status(200).json({
            success:true,
            message:"You cannot update user with above 20k salary"
        })
    }
    const userr = await Employee.findById(req.params.id)


    res.status(200).json({
        success:true,
        userr
    })
})

