// "use client"

// import { useEffect, useState } from "react";
// import { supabaseClient } from "../lib/supabase/client"
// import {Card,CardHeader, CardTitle, CardDescription,} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { CalendarDays } from "lucide-react";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const [quiz, setQuiz] = useState([]);
//   const supabase = supabaseClient();
//   const router = useRouter()

//   useEffect(() => {
//     const getQuiz = async () => {
//       const response = await supabase.from("quiz").select("*");
//       console.log(response.data)
//       setQuiz(response.data);
//     };
//     getQuiz()
//   }, []);

//   console.log(quiz, "hii")

//   const handleRedirect = (quizId) => {
//     router.push(`/quiz2/${quizId}`)
//   }

//   return (
//     <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold tracking-tight">Quizzes</h1>
//         <Badge variant="secondary">{quiz.length} total</Badge>
//       </div>

//       {quiz.length === 0 ? (
//         <p className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
//           Loading...
//         </p>
//       ) : (
//         <div className="grid gap-3 sm:grid-cols-2">
//           {quiz.map((item) => {
//             return (
//               <Card
//                 key={item.id}
//                 className="transition-colors hover:bg-muted/50"
//                 onClick={() => handleRedirect(item.id)}
//               >
//                 <CardHeader>
//                     <CardTitle className="text-base">{}</CardTitle>
//                   <CardTitle className="text-base">{item.quizName}</CardTitle>
//                   <CardDescription className="flex items-center gap-1.5">
//                     <CalendarDays className="h-3.5 w-3.5" />
//                     {new Date(item.created_at).toLocaleDateString(undefined, {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </CardDescription>
//                 </CardHeader>
//               </Card>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
// export default Page

"use client"

import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabase/client"
import {Card,CardHeader, CardTitle, CardDescription,} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

// GitHub's system font stack (UI only)
const githubFont = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
};

const Page = () => {
  const [quiz, setQuiz] = useState([]);
  const supabase = supabaseClient();
  const router = useRouter()

  useEffect(() => {
    const getQuiz = async () => {
      const response = await supabase.from("quiz").select("*");
      console.log(response.data)
      setQuiz(response.data);
    };
    getQuiz()
  }, []);

  console.log(quiz, "hii")

  const handleRedirect = (quizId) => {
    router.push(`/quiz2/${quizId}`)
  }

  return (
    <div
      style={githubFont}
      className="min-h-screen bg-indigo-50/50 dark:bg-background"
    >
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-indigo-950 dark:text-indigo-100">
            Quizzes
          </h1>
          <Badge
            variant="secondary"
            className="bg-indigo-100 tabular-nums text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-200"
          >
            {quiz.length} total
          </Badge>
        </div>

        {quiz.length === 0 ? (
          <p className="rounded-lg border-2 border-dashed border-indigo-200 bg-white p-8 text-center text-sm text-muted-foreground dark:border-indigo-900 dark:bg-transparent">
            Loading...
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {quiz.map((item) => {
              return (
                <Card
                  key={item.id}
                  className="cursor-pointer border-l-4 border-l-indigo-500 shadow-sm transition-colors hover:border-indigo-300 hover:border-l-indigo-500 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30"
                  onClick={() => handleRedirect(item.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-base font-semibold text-indigo-950 dark:text-indigo-100">
                      {item.quizName}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(item.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default Page