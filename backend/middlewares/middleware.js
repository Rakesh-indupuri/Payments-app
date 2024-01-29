const JWT_KEY=process.env.JWT_KEY
const jwt=require("jsonwebtoken")
function authMiddleware(req,res,next){
    const auth_header=req.headers.authorization
    if(!auth_header || !auth_header.startsWith("Bearer")){
        res.json({})
    }
    const token=auth_header.split(" ")[1]
    try{
        const decoded=jwt.verify(token,JWT_KEY)
        req.userId=decoded.userId
        next()
    }catch(err){
        return res.status(403).json({})
    }
}
module.exports={authMiddleware}