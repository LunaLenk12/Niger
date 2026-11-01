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

// GitHub's system font stack (UI only)
const githubFont = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
}

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
    <div
      style={githubFont}
      className="flex min-h-screen items-center justify-center bg-indigo-50/50 px-4 py-8 dark:bg-background"
    >
            <ToastContainer position="top-right" autoClose={3000} />
      <Card className="w-full max-w-sm overflow-hidden border-t-4 border-t-indigo-500 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-indigo-950 dark:text-indigo-100">
            Welcome back
          </CardTitle>
          <CardDescription>
            Enter your email and password to log in.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="h-11 focus-visible:ring-indigo-400"
              onChange={emailLogin}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="h-11 focus-visible:ring-indigo-400"
              onChange={passwordLogin}
              placeholder="Your password"
            />
          </div>
          <Button
            onClick={login}
            className="h-11 w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Login
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?
          </p>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              onClick={handleRedirect}
              className="flex-1 border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 dark:border-indigo-800 dark:bg-transparent dark:text-indigo-300"
            >
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
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter,
// } from "@/components/ui/card"
// import { toast, ToastContainer } from "react-toastify"

// const Login = () => {
//   const supabase = supabaseClient()
//   const [name, setName] = useState("")
//   const [password, setPassword] = useState("")
//   const router = useRouter()
//   const login = async () => {
//     const { error } = await supabase.auth.signInWithPassword({
//       email: name,
//       password: password,
//     })

//     if (error) {
//       toast.error("The password or the gmail is wrong")
//       return
//     }

//     toast.success("Logged in successfully!")
//     setTimeout(() => router.push("quiz2"), 1000)
//   }

//   const emailLogin = (event) => {
//     setName(event.target.value)
//   }
//   const passwordLogin = (event) => {
//     setPassword(event.target.value)
//   }
//   const handleRedirect = () => {
//     router.push(`signup`)
//   }
//   const handleRedirect2 = () => {
//     router.push(`quiz2`)
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center px-4 py-8">
//             <ToastContainer position="top-right" autoClose={3000} />
//       <Card className="w-full max-w-sm">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl">Welcome back</CardTitle>
//           <CardDescription>
//             Enter your email and password to log in.
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               onChange={emailLogin}
//               placeholder="you@example.com"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               onChange={passwordLogin}
//               placeholder="Your password"
//             />
//           </div>
//           <Button onClick={login} className="w-full">
//             Login
//           </Button>
//         </CardContent>

//         <CardFooter className="flex flex-col gap-3 border-t pt-6">
//           <p className="text-sm text-muted-foreground">
//             Don&apos;t have an account?
//           </p>
//           <div className="flex w-full gap-2">
//             <Button variant="outline" onClick={handleRedirect} className="flex-1">
//               Sign Up
//             </Button>
//             {/* <Button variant="secondary" onClick={handleRedirect2} className="flex-1">
//               Tests
//             </Button> */}
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default Login