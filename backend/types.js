const zod=require("zod")
const signupSchema=zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

module.exports={signupSchema,updateBody}