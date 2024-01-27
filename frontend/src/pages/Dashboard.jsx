import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
export function Dashboard(){
    const [balance,setBalance] = useState(0)
    // useEffect(()=>{
    //     const response=axios.get("http://localhost:3000/api/account/balance",{
    //         headers:{
    //             Authorization:`Bearer ${localStorage.getItem("token")}`
    //         }
    //     })
    //     setBalance(response.data.balance)
    // },[])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);
    
    
    return(
        <>
            <Appbar/>
            <Balance value={balance} />
            <Users/>
        </>
    )
}