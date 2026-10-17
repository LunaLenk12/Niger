"use client"

import { useState } from "react"
import { supabaseClient } from "../lib/supabase/client"

const Signup = () => {
const supabase = supabaseClient()
const [name, setName] = useState("")
const [password, setPassword] = useState("")
const signup = async () => {
    const response = await supabase.auth.signUp({
        email: name,
        password: password
    })
    console.log(response)
}
const emailLogin = (event) => {
    setName(event.target.value)
}
const passwordLogin = (event) => {
    setPassword(event.target.value)
}
return (
    <div>
        <input onChange={emailLogin} placeholder="email"/>
         <input onChange={passwordLogin} placeholder="password"/>
         <button onClick={signup}>Signup</button>
    </div>
)
}

export default Signup