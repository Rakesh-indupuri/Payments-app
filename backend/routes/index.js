const express=require("express")
const userRouter=require("./user")
const amountRouter=require("./account")
const router=express.Router()
router.use("/user",userRouter)
router.use("/account",amountRouter)
module.exports=router