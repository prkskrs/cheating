import Item from "../models/Items.js"
import bigPromise from "../middlewares/bigPromise.js"


export const adminAddAnyItem = bigPromise(async(req,res,next)=>{
    const {name , price , category,expiryDate,mfgDate}=req.body;
    console.log(name)
    if(!price || !name || !category){
        return res.status(400).json({
            success:"false",
            message:"Name, Price and Category fields are required."
        })
    }

    const existingItem=await Item.findOne({name});
    console.log(existingItem)
    if(existingItem){
        return res.status(400).json({
            success:"false",
            message:"Item Already Exists"
        })
    }
    const item= await Item.create({
        name,
        price,
        category,
        expiryDate,
        mfgDate
    })
    res.status(200).json({
        success:true,
        message:"Item added successfully!",
        item
    })
})


export const adminDeleteAnyItem=bigPromise(async(req,res,next)=>{
    console.log(req.params.id);
    const item= await Item.findById(req.params.id)

    console.log(item)

    if(!item){
        return res.status(401).json({
            success:false,
            message:"No item found with this id "
        })
    }
    await item.remove()
    res.status(200).json({
        success:true,
        message:"Item Deleted Succesfully!",
        deletedItem:item
    })
})

export const adminAllItem=bigPromise(async(req,res,next)=>{

    const items= await Item.find({})

    console.log(items)

    if(!items){
        return res.status(401).json({
            success:false,
            message:"No items found "
        })
    }
    res.send(items)
})

