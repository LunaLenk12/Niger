"use client"

import { useState } from "react"
import { supabaseClient } from "../lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter,
} from "@/components/ui/card"
import { toast, ToastContainer } from "react-toastify"

const Login = () => {
  const supabase = supabaseClient()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: name,
      password: password,
    })

    if (error) {
      toast.error("The password or the gmail is wrong")
      return
    }

    toast.success("Logged in successfully!")
    setTimeout(() => router.push("quiz2"), 1000)
  }

  const emailLogin = (event) => {
    setName(event.target.value)
  }
  const passwordLogin = (event) => {
    setPassword(event.target.value)
  }
  const handleRedirect = () => {
    router.push(`signup`)
  }
  const handleRedirect2 = () => {
    router.push(`quiz2`)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <ToastContainer position="top-right" autoClose={3000} />
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to log in.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={emailLogin}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={passwordLogin}
              placeholder="Your password"
            />
          </div>
          <Button onClick={login} className="w-full">
            Login
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?
          </p>
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={handleRedirect} className="flex-1">
              Sign Up
            </Button>
            {/* <Button variant="secondary" onClick={handleRedirect2} className="flex-1">
              Tests
            </Button> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
// "use client"

// import { useState } from "react"
// import { supabaseClient } from "../lib/supabase/client"
// import { useRouter } from "next/navigation"

// const Login = () => {
// const supabase = supabaseClient()
// const [name, setName] = useState("")
// const [password, setPassword] = useState("")
// const router = useRouter()
// const login = async () => {
//     const response = await supabase.auth.signInWithPassword({
//         email: name,
//         password: password
//     })
//     console.log(response)
// }

// const emailLogin = (event) => {
//     setName(event.target.value)
// }
// const passwordLogin = (event) => {
//     setPassword(event.target.value)
// }
//     const handleRedirect = () => {
//     router.push(`signup`)
// }
//     const handleRedirect2 = () => {
//     router.push(`quiz2`)
// }

//  return (
//     <div>
//         <input onChange={emailLogin} placeholder="email"/>
//          <input onChange={passwordLogin} placeholder="password"/>
//          <button onClick={login}>Login</button>
//          <h1>Dont have an account?</h1>
//          <button onClick={handleRedirect}>Sign Up</button>
//          <button onClick={handleRedirect2}>Tests</button>
//     </div>
// )
// }

// export default Login