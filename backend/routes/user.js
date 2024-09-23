const express=require("express")
const { signupSchema, updateBody } = require("../types")
const { User, Account } = require("../db")
const jwt=require("jsonwebtoken")
const router=express.Router()
const key=process.env.JWT_KEY
const { authMiddleware } = require("../middlewares/middleware")
router.post("/signup",async (req,res)=>{
    const userData=req.body
    const parseData=signupSchema.safeParse(userData)
    //console.log(parseData.error)
    if(!parseData.success){
        return res.json({
            msg:"Incorrect Inputs"
        })
    }
    const user=await User.findOne({
        username:userData.username
    })
    if (user) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const newUser = new User({ username: req.body.username,firstName: req.body.firstName,lastName: req.body.lastName,password: req.body.password})
    await newUser.save()
    const amount=new Account({userId:newUser._id,balance:1+Math.random()*10000})
    await amount.save()
    const token=jwt.sign({
        userId:newUser._id
    },key)
    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

router.post("/signin",async(req,res)=>{
    const {username,password} = req.body
    const user=await User.findOne({username:username})
    if(user){
        if(user.password===password){
            const token=jwt.sign({
                userId:user._id
            },key)
            res.status(200).json({token:token})
            return;
        }else{
            res.status(401).json({message:"Incorrect password"})
        }
    }else{
        res.status(406).json({
            msg:"User doesnot exists please sign up"
        })
    }
})

router.put("/",authMiddleware,async (req,res)=>{
    const data=req.body
    const parsed=updateBody.safeParse(data)
    if(!parsed.success){
        res.status(411).json({
            msg:"Error while updating the info."
        })
    }
    const updatedUser= await User.findByIdAndUpdate(req.userId,{$set:data},{new:true})
    if (!updatedUser) {
        return res.status(404).json({
          msg: "User not found",
        });
    }
    res.json({
    msg: "Updated successfully",
    });
})

router.get("/bulk", authMiddleware, async (req, res) => {
    let filter = req.query.filter || " ";
    let query = {};
    if (filter.trim() !== "") {
      query.$or = [
        {
          firstName: {
            $regex: filter,
            $options: "i"
          },
        },
        {
          lastName: {
            $regex: filter,
            $options: "i"
          },
        },
      ];
    }
    const users = await User.find(query);
    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
});  

module.exports=router