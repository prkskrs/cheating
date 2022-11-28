import mongoose  from "mongoose";
import validator from "validator";


const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:[true,'Please provide a name'],
        maxlength:[40,'Name should be under 40 characters.']
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
    },
    mfgDate:{
        tyep:String
    },
    expiryDate:{
        type:String
    },
    photo:{
        id:{
            type:String,
        },
        secure_url:{
            type:String,
        }
    },
})




const Item = mongoose.model("Item",itemSchema);

export default Item;