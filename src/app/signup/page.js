"use client"

import { useState } from "react"
import { supabaseClient } from "../lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle,CardDescription,  CardContent,  CardFooter,
} from "@/components/ui/card"
import { toast, ToastContainer } from "react-toastify"

const Signup = () => {
  const supabase = supabaseClient()
  const router = useRouter()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const signup = async () => {
   const { error } = await supabase.auth.signUp({
      email: name,
      password: password,
    })

    if (error) {
      toast.error("The password or the gmail is wrong")
      return
    }

    toast.success("Logged in successfully!")
   
  }
  const emailLogin = (event) => {
    setName(event.target.value)
  }
  const passwordLogin = (event) => {
    setPassword(event.target.value)
  }
  const handleRedirect = () => {
    router.push(`login`)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <ToastContainer position="top-right" autoClose={3000} />
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email and choose a password to sign up.
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
              placeholder="Choose a password"
            />
          </div>
          <Button onClick={signup} className="w-full">
            Sign up
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Button variant="outline" onClick={handleRedirect} className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup
// "use client"

// import { useState } from "react"
// import { supabaseClient } from "../lib/supabase/client"
// import { useRouter } from "next/navigation"

// const Signup = () => {
// const supabase = supabaseClient()
// const router = useRouter()
// const [name, setName] = useState("")
// const [password, setPassword] = useState("")
// const signup = async () => {
//     const response = await supabase.auth.signUp({
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
//     router.push(`login`)
// }
// return (
//     <div>
//         <input onChange={emailLogin} placeholder="email"/>
//          <input onChange={passwordLogin} placeholder="password"/>
//          <button onClick={signup}>Signup</button>
//          <h1>Already have an account?</h1>
//          <button onClick={handleRedirect}>Login</button>
//     </div>
// )
// }

// export default Signup