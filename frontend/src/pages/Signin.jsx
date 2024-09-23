import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
export function Signin(){
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    return(
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className='flex flex-col justify-center'>
                <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your infromation to signin"} />
                <InputBox onChange={(e)=>setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
                <InputBox onChange={(e)=>setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
                <InputBox onChange={(e)=>setUsername(e.target.value)} placeholder="sample@gmail.com" label={"Email"} />
                <InputBox onChange={(e)=>setPassword(e.target.value)} placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button
                    onClick={async()=>{
                        try{
                        const response=await axios.post("https://payments-app-nab7.onrender.com/api/v1/user/signin",{
                            username:username,
                            password:password
                        })
                        if(response.status==200){
                            localStorage.setItem("token",response.data.token)
                            navigate("/dashboard")
                        }
                        }
                        catch (error) {
                            // console.error("Error during sign-in:", error);
                            if (error.response.status === 406) {
                                alert("User does not exist. Please sign up.");
                            } else if (error.response.status === 401) {
                                alert("Incorrect Password!!");
                            } else {
                                alert(`Unexpected status code: ${error.response.status}`);
                            }
                        }
                    }}
                    label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}