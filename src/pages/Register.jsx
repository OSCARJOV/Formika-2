import { async } from "@firebase/util";
import { useState } from "react";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirect } from "../hooks/useRedirect";


const Register = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("")

const {user} = useUserContext();

useRedirect(user, "/dashboard")


const handlesubmid = async (e) => {
    e.preventDefault();
    console.log("click");
    try {
   const credential = await register({email: email,password:password})
   console.log(credential);
    } catch (error) {
        console.log(error);
    }

}


    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handlesubmid}> 
            <input 
            type="text" 
            placeholder="Ingrese email" 
            value={email} 
            onChange={(e) =>setEmail(e.target.value)} />
           
            <input 
            type="password" 
            placeholder="Ingrese password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
           
           <button type="submit">Register</button>
        </form>
        </>
        )
};

export default Register;
