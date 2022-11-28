import mongoose  from "mongoose";
import validator from "validator";


const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:[true,'Please provide a name'],
        maxlength:[40,'Name should be under 40 characters.']
    },
    ssn:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
    },
    department:{
        tyep:String
    },
    dob:{
        type:String
    },
    doj:{
        type:String
    }
})




const Employee = mongoose.model("Item",employeeSchema);

export default Employee;

