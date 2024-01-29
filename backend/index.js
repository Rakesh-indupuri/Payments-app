const express = require("express");
const cors=require("cors")
const app=express()
const mainRouter=require("./routes/index")
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: ["https://payments-app-lovat.vercel.app/"],
    methods:["POST","GET","PUT"],
    credentials:true
  }));
  
app.use("/api/v1/",mainRouter)

app.listen(3000)