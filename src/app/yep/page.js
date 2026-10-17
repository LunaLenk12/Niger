"use client"

// import { supabaseClient } from "@/app/lib/supabase/client"
// import { useParams, useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card,CardHeader,CardTitle, CardContent,} from "@/components/ui/card";
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
//     setAnswers({...answers,[questionId]: answerId})
//   }
//   console.log(answers, "ghey")
  
//   const handleRedirect = (quizId) => {
//     router.push(`/quiz2`)
//   }
//   const answer = () => {
//     let totalPoint = 0;
//     let myScore = 0;
//     for(let i =0; i < questions.length; i++){
//         totalPoint = totalPoint + questions[i].point
//         const correctAnswer = questions[i].question_answers.find((answer) => {
//            return answer.isCorrect;
//         })
//         console.log(correctAnswer)

//         if (answers[correctAnswer.questionId] === correctAnswer.id) {
//             myScore = myScore + questions[i].point;

//         }
//     }
//     setResult({totalPoint, myScore})
//   }
//   const getBorderStyle = ({isCorrect, isSelected}) => {
//    if (result && isCorrect) return 'border-green-500'
//    if (result && isSelected) return 'border-red-500'
//    if (isSelected) return 'border-blue-500'
//   }
//   return (
//     <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
//       <div className="flex items-center justify-between">
//          <Button onClick={handleRedirect}>Quizzes</Button>
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
//                           className={`rounded-md border bg-muted/30 px-3 py-2 text-sm ${getBorderStyle(
//                                     {
//                         isCorrect: answer.isCorrect,

//                         isSelected: answers[question.id] === answer.id
//                       },
//                           )}`}
                         
//                         >
//                           {answer.answer}
                          
//                         </li>
//                       );
                     
//                     })}
//                   </ul>
//                 </CardContent>
//               </Card>
//             );
//           })}
//           <Button onClick={answer}>Answers</Button>
//           {result && (
//             <div>
//                 <div>totalPoint:{result.totalPoint}</div>
//                 <div>Score:{result.myScore}</div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// export default Page
