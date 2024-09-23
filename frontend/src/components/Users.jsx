import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = () => {
    const token=localStorage.getItem("token")
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("")
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://payments-app-nab7.onrender.com/api/v1/user/bulk?filter=${filter}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUsers(response.data.user);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
    }, [token, filter]);
    
    return <div className="mx-4">
        <div className="font-bold mt-6 ml-1 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </div>
}

function User({user}) {
    const navigate=useNavigate()
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={()=>navigate(`/send?id=${user._id}&name=${user.firstName}`)} label={"Send Money"} />
        </div>
    </div>
}