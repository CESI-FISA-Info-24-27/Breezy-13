"use client";
import { AuthContext } from "../../context/UserContext";
import { useState } from "react";


export default function AppWrapper({children}){
    const [userAuth, setUserAuth] = useState({id: "123"});
    
    return <AuthContext.Provider value={{userAuth,setUserAuth}}>{children}</AuthContext.Provider>;
}