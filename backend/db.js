const mongoose=require("mongoose");
const url=process.env.url
mongoose.connect(url)
const userSchema=mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password:String
})
const accountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:mongoose.Schema.Types.Number,
        required:true
    }
})
const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Amount",accountSchema)
module.exports={
    User,Account
}