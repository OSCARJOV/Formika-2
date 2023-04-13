import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useRedirect = (user, path) => {
     
        const navigate = useNavigate()
    
        useEffect(() => {  //si ya existe un usuario lo envia a dashboard
            if(user){
             navigate(path)
         }
         }, [user])

}

