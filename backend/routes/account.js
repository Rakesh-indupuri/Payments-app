const express=require("express")
const { Account } = require("../db")
const { authMiddleware } = require("../middlewares/middleware")
const { default: mongoose } = require("mongoose")
const router=express.Router()

router.get("/balance",authMiddleware,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    res.status(200).json({
        balance:account.balance
    })
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession()
    session.startTransaction()
    const {amount,to} = req.body
    const sender=await Account.findOne({userId:req.userId}).session(session)
    const money=sender.balance
    if(!sender||money<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const receiver = await Account.findOne({userId:to}).session(session)
    if(!receiver){
        await session.abortTransaction()
        return res.status(402).json({
            message: "User Does not exist"
        });
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction()
    res.status(200).json({
        msg:"Transaction Successfull"
    })
})
module.exports=router