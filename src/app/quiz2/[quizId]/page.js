"use client"

import { supabaseClient } from "@/app/lib/supabase/client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// GitHub's system font stack (UI only)
const githubFont = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
};

const Page = () => {
  const params = useParams()
  const router = useRouter();
  const supabase = supabaseClient()
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null)
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const getQuizQuestions = async () => {
      const response = await supabase.from("quiz_questions").select("*, question_answers(*)").eq('quizId', params.quizId)
      setQuestions(response.data)
    }
    getQuizQuestions()
  }, [])
  const handleAnswer = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId })
  }
  console.log(answers, "ghey")

  const handleRedirect = (quizId) => {
    router.push(`/quiz2`)
  }
  const answer = async () => {
    let totalPoint = 0;
    let myScore = 0;
    for (let i = 0; i < questions.length; i++) {
      totalPoint = totalPoint + questions[i].point
      const correctAnswer = questions[i].question_answers.find((answer) => {
        return answer.isCorrect;
      })
      console.log(correctAnswer)

      if (answers[correctAnswer.questionId] === correctAnswer.id) {
        myScore = myScore + questions[i].point;

      }
    }
    setResult({ totalPoint, myScore })

    await supabase.from("quiz_attempts").insert({
      totalScore: totalPoint,
      score: myScore,
      quizId: params.quizId
    })
  }
  const getBorderStyle = ({ isCorrect, isSelected }) => {
    if (result && isCorrect) return 'border-green-500'
    if (result && isSelected) return 'border-red-500'
    if (isSelected) return 'border-indigo-500'
  }
  return (
    <div
      style={githubFont}
      className="min-h-screen bg-indigo-50/50 dark:bg-background"
    >
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={handleRedirect}
            className="border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 dark:border-indigo-800 dark:bg-transparent dark:text-indigo-300"
          >
            Quizzes
          </Button>
          <h1 className="text-2xl font-semibold text-indigo-950 dark:text-indigo-100">
            Questions
          </h1>
          <Badge
            variant="secondary"
            className="bg-indigo-100 tabular-nums text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-200"
          >
            {questions.length} total
          </Badge>
        </div>

        {questions.length === 0 ? (
          <p className="rounded-lg border-2 border-dashed border-indigo-200 bg-white p-8 text-center text-sm text-muted-foreground dark:border-indigo-900 dark:bg-transparent">
            Loading...
          </p>
        ) : (
          <div className="space-y-5">
            {questions.map((question, index) => {
              return (
                <Card
                  key={question.id}
                  className="overflow-hidden border-l-4 border-l-indigo-500 shadow-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                          Question {index + 1}
                        </p>
                        <CardTitle className="text-lg font-semibold leading-snug">
                          {question.question}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="secondary"
                        className="shrink-0 bg-indigo-100 tabular-nums text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-200"
                      >
                        {question.point} {question.point === 1 ? "point" : "points"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="grid gap-2.5 sm:grid-cols-2">
                      {question?.question_answers?.map((answer, answerIndex) => {
                        return (
                          <li
                            key={answer.id}
                            onClick={() => handleAnswer(question.id, answer.id)}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 bg-background px-3 py-2.5 text-sm transition-colors hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 ${getBorderStyle(
                              {
                                isCorrect: answer.isCorrect,

                                isSelected: answers[question.id] === answer.id
                              },
                            ) ?? ""}`}

                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                              {String.fromCharCode(65 + answerIndex)}
                            </span>
                            <span>{answer.answer}</span>

                          </li>
                        );

                      })}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
            <Button
              onClick={answer}
              className="h-11 bg-indigo-600 px-8 text-white hover:bg-indigo-700"
            >
              Finish
            </Button>
            {result && (
              <div className="grid grid-cols-2 gap-3 rounded-lg border-2 border-indigo-200 bg-white p-4 dark:border-indigo-900 dark:bg-transparent">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total points</p>
                  <p className="text-2xl font-semibold tabular-nums">{result.totalPoint}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Your score</p>
                  <p className="text-2xl font-semibold tabular-nums text-indigo-700 dark:text-indigo-300">{result.myScore}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Page



// "use client"

// import { supabaseClient } from "@/app/lib/supabase/client"
// import { useParams, useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardContent, } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const Page = () => {
//   const params = useParams()
//   const router = useRouter();
//   const supabase = supabaseClient()
//   const [questions, setQuestions] = useState([]);
//   const [result, setResult] = useState(null)
//   const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     const getQuizQuestions = async () => {
//       const response = await supabase.from("quiz_questions").select("*, question_answers(*)").eq('quizId', params.quizId)
//       setQuestions(response.data)
//     }
//     getQuizQuestions()
//   }, [])
//   const handleAnswer = (questionId, answerId) => {
//     setAnswers({ ...answers, [questionId]: answerId })
//   }
//   console.log(answers, "ghey")

//   const handleRedirect = (quizId) => {
//     router.push(`/quiz2`)
//   }
//   const answer = async () => {
//     let totalPoint = 0;
//     let myScore = 0;
//     for (let i = 0; i < questions.length; i++) {
//       totalPoint = totalPoint + questions[i].point
//       const correctAnswer = questions[i].question_answers.find((answer) => {
//         return answer.isCorrect;
//       })
//       console.log(correctAnswer)

//       if (answers[correctAnswer.questionId] === correctAnswer.id) {
//         myScore = myScore + questions[i].point;

//       }
//     }
//     setResult({ totalPoint, myScore })

//     await supabase.from("quiz_attempts").insert({
//       totalScore: totalPoint,
//       score: myScore,
//       quizId: params.quizId
//     })
//   }
//   const getBorderStyle = ({ isCorrect, isSelected }) => {
//     if (result && isCorrect) return 'border-green-500'
//     if (result && isSelected) return 'border-red-500'
//     if (isSelected) return 'border-blue-500'
//   }
//   return (
//     <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
//       <div className="flex items-center justify-between">
//         <Button onClick={handleRedirect}>Quizzes</Button>
//         <h1 className="text-2xl font-semibold tracking-tight">Questions</h1>
//         <Badge variant="secondary">{questions.length} total</Badge>
//       </div>

//       {questions.length === 0 ? (
//         <p className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
//           Loading...
//         </p>
//       ) : (
//         <div className="space-y-4">
//           {questions.map((question, index) => {
//             return (
//               <Card key={question.id}>
//                 <CardHeader className="pb-3">
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="space-y-1">
//                       <p className="text-sm text-muted-foreground">
//                         Question {index + 1}
//                       </p>
//                       <CardTitle className="text-lg leading-snug">
//                         {question.question}
//                       </CardTitle>
//                     </div>
//                     <Badge variant="outline" className="shrink-0">
//                       {question.point} {question.point === 1 ? "point" : "points"}
//                     </Badge>
//                   </div>
//                 </CardHeader>

//                 <CardContent>
//                   <ul className="grid gap-2 sm:grid-cols-2">
//                     {question?.question_answers?.map((answer, answerIndex) => {
//                       return (
//                         <li
//                           key={answer.id}
//                           onClick={() => handleAnswer(question.id, answer.id)}
//                           className={`flex cursor-pointer items-center gap-3 rounded-md border bg-muted/30 px-3 py-2 text-sm ${getBorderStyle(
//                             {
//                               isCorrect: answer.isCorrect,

//                               isSelected: answers[question.id] === answer.id
//                             },
//                           )}`}

//                         >
//                           <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-xs font-semibold text-muted-foreground">
//                             {String.fromCharCode(65 + answerIndex)}
//                           </span>
//                           <span>{answer.answer}</span>

//                         </li>
//                       );

//                     })}
//                   </ul>
//                 </CardContent>
//               </Card>
//             );
//           })}
//           <Button onClick={answer}>Finish</Button>
//           {result && (
//             <div>
//               <div>totalPoint:{result.totalPoint}</div>
//               <div>Score:{result.myScore}</div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// export default Page