const express = require("express");
const cors=require("cors")
const app=express()
const mainRouter=require("./routes/index")
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: ["https://payments-app-lovat.vercel.app"],
    methods:["POST","GET","PUT"],
    credentials:true
  }));
app.options('/api/v1/user/signin', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://payments-app-lovat.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
});
app.use("/api/v1/",mainRouter)
app.listen(3000)