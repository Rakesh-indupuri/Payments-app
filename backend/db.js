const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.url;
if (!url) {
  console.error("MongoDB URL is not defined in environment variables.");
  process.exit(1);
}
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully!'))
.catch((error) => console.error('MongoDB connection error:', error));
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