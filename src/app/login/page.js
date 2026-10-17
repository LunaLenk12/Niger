"use client"

import { useState } from "react"
import { supabaseClient } from "../lib/supabase/client"

const Login = () => {
const supabase = supabaseClient()
const login = async () => {
    const response = await supabase.auth.signInWithPassword({
        email: '',
        password: ''
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
         <button onClick={login}>Login</button>
    </div>
)
}

export default Login