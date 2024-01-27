const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://admin:9014093842@cluster0.fiubyou.mongodb.net/payments")
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