import { useState } from "react"
import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
export function SignUp(){
    const navigate=useNavigate()
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    return(
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className='flex flex-col justify-center'>
                <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <InputBox onChange={(e)=>setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
                <InputBox onChange={(e)=>setLastName(e.target.value)}  placeholder="Doe" label={"Last Name"} />
                <InputBox onChange={(e)=>setUsername(e.target.value)}  placeholder="sample@gmail.com" label={"Email"} />
                <InputBox onChange={(e)=>setPassword(e.target.value)} placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button label={"Sign up"} onClick={async ()=>{
                    try{
                    const response = await axios.post("https://payments-app-api-two.vercel.app/api/v1/user/signup",{
                            username:username,
                            firstName:firstName,
                            lastName:lastName,
                            password:password
                        })
                        localStorage.setItem("token",response.data.token)
                        if(response.status==200){
                            navigate("/dashboard")
                        }
                    }catch(error){
                        if (error.response.status === 411) {
                            alert("User Already exists.Please sign In.");
                        }
                    }
                    }}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}