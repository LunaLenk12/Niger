"use client"

import { useState } from "react";
import { supabaseClient } from "../lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription,} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, List, Check, Save } from "lucide-react";
import { useRouter } from "next/navigation";

// GitHub's system font stack (UI only)
const githubFont = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
};

const Quizy = () => {
  const supabase = supabaseClient();
  const router = useRouter()
  const [quiz, setQuiz] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      point: 0,
      answers: ["", "", "", ""],
      correctIndex: 0,
    },
  ]);

  const handleQuizName = (event) => setQuiz(event.target.value);

  const createQuiz = async () => {
    const response = await supabase
      .from("quiz")
      .insert({
        quizName: quiz,
      })
      .select("*")
      .single();
    const quizId = response.data.id;

    for (let i = 0; i < questions.length; i++) {
      const response = await supabase
        .from("quiz_questions")
        .insert({
          question: questions[i].question,
          quizId: quizId,
          point: questions[i].point,
        })
        .select("*");

      const questionId = response.data[0].id;

      for (let j = 0; j < questions[i].answers.length; j++) {
        await supabase.from("question_answers").insert({
          questionId: questionId,
          answer: questions[i].answers[j],
          isCorrect: questions[i].correctIndex === j,
        });
      }
      console.log(response, "question");
    }
  };

  const handleQuestion = (value, field, questionIndex) => {
    const updatedQuestion = questions.map((question, index) => {
      if (questionIndex === index) {
        return { ...question, [field]: value };
      } else {
        return question;
      }
    });

    setQuestions(updatedQuestion);
  };

  const handleAnswers = (questionIndex, answerIndex, value) => {
    const updatedQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        return {
          ...question,
          answers: question.answers.map((answer, aIndex) => {
            if (aIndex === answerIndex) {
              return value;
            } else {
              return answer;
            }
          }),
        };
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        point: 0,
        answers: ["", "", "", ""],
        correctIndex: 0,
      },
    ]);
  };
    const handleRedirect = (quizId) => {
    router.push(`/quiz2`)
  }
  const deleteQuestion = () => {
  
  }

  return (
    <div
      style={githubFont}
      className="min-h-screen bg-indigo-50/50 dark:bg-background"
    >
      <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-indigo-950 dark:text-indigo-100">
              Create a quiz
            </h1>
            <p className="text-sm text-muted-foreground">
              Name your quiz, add questions, and mark the correct answer for each.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleRedirect}
            className="shrink-0 border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 dark:border-indigo-800 dark:bg-transparent dark:text-indigo-300"
          >
            <List className="mr-2 h-4 w-4" />
            Quizzes
          </Button>
        </div>

        {/* Quiz name + create */}
        <Card className="shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="quiz-name" className="text-sm font-medium">
                Quiz name
              </Label>
              <Input
                id="quiz-name"
                className="h-11 text-base focus-visible:ring-indigo-400"
                placeholder="e.g. World capitals"
                onChange={(e) => handleQuizName(e)}
                value={quiz}
              />
            </div>
            <Button
              onClick={createQuiz}
              className="h-11 bg-indigo-600 px-6 text-white hover:bg-indigo-700 sm:w-auto"
            >
              <Save className="mr-2 h-4 w-4" />
              Create quiz
            </Button>
          </CardContent>
        </Card>

        {/* Questions summary */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
            {questions.length} {questions.length === 1 ? "question" : "questions"}
          </h2>
          <span className="text-sm text-muted-foreground">
            {questions.reduce((sum, q) => sum + (Number(q.point) || 0), 0)} points in total
          </span>
        </div>

        {/* Questions */}
        <div className="space-y-5">
          {questions.map((question, questionIndex) => {
            return (
              <Card
                key={questionIndex}
                className="overflow-hidden border-l-4 border-l-indigo-500 shadow-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                        {questionIndex + 1}
                      </span>
                      <CardTitle className="text-base">
                        Question {questionIndex + 1}
                      </CardTitle>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 tabular-nums text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-200"
                    >
                      {question.point} {question.point === 1 ? "point" : "points"}
                    </Badge>
                  </div>
                  <CardDescription className="pl-11">
                    Tick the box next to the correct answer.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`question-${questionIndex}`}
                        className="text-sm font-medium"
                      >
                        Question
                      </Label>
                      <Input
                        id={`question-${questionIndex}`}
                        className="h-11 focus-visible:ring-indigo-400"
                        placeholder="question..."
                        value={question.question}
                        onChange={(e) =>
                          handleQuestion(e.target.value, "question", questionIndex)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`point-${questionIndex}`}
                        className="text-sm font-medium"
                      >
                        Points
                      </Label>
                      <Input
                        id={`point-${questionIndex}`}
                        className="h-11 focus-visible:ring-indigo-400"
                        placeholder="point"
                        type="number"
                        min={0}
                        value={question.point}
                        onChange={(event) =>
                          handleQuestion(
                            Number(event.target.value),
                            "point",
                            questionIndex,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Answers</Label>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {question.answers.map((answer, answerIndex) => {
                        const isCorrect = question.correctIndex === answerIndex;
                        return (
                          <div
                            key={answerIndex}
                            className={`flex items-center gap-3 rounded-lg border-2 bg-background p-2.5 transition-colors ${
                              isCorrect
                                ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                                : "border-border hover:border-indigo-300"
                            }`}
                          >
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                                isCorrect
                                  ? "bg-green-600 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {isCorrect ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                String.fromCharCode(65 + answerIndex)
                              )}
                            </span>
                            <Input
                              className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                              placeholder={`answer ${String.fromCharCode(65 + answerIndex)}...`}
                              value={answer}
                              onChange={(e) =>
                                handleAnswers(
                                  questionIndex,
                                  answerIndex,
                                  e.target.value,
                                )
                              }
                            />
                            <Checkbox
                              checked={isCorrect}
                              aria-label={`Mark answer ${answerIndex + 1} as correct`}
                              onCheckedChange={() =>
                                handleQuestion(
                                  answerIndex,
                                  "correctIndex",
                                  questionIndex,
                                )
                              }
                              className="shrink-0 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Button
          variant="outline"
          onClick={addQuestion}
          className="h-12 w-full border-2 border-dashed border-indigo-300 bg-white text-indigo-700 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-800 dark:bg-transparent dark:text-indigo-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add question
        </Button>
      </div>
    </div>
  );
};

export default Quizy;

// "use client"

// import { useState } from "react";
// import { supabaseClient } from "../lib/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription,} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Plus } from "lucide-react";
// import { useRouter } from "next/navigation";

// const Quizy = () => {
//   const supabase = supabaseClient();
//   const router = useRouter()
//   const [quiz, setQuiz] = useState("");
//   const [questions, setQuestions] = useState([
//     {
//       question: "",
//       point: 0,
//       answers: ["", "", "", ""],
//       correctIndex: 0,
//     },
//   ]);

//   const handleQuizName = (event) => setQuiz(event.target.value);

//   const createQuiz = async () => {
//     const response = await supabase
//       .from("quiz")
//       .insert({
//         quizName: quiz,
//       })
//       .select("*")
//       .single();
//     const quizId = response.data.id;

//     for (let i = 0; i < questions.length; i++) {
//       const response = await supabase
//         .from("quiz_questions")
//         .insert({
//           question: questions[i].question,
//           quizId: quizId,
//           point: questions[i].point,
//         })
//         .select("*");

//       const questionId = response.data[0].id;

//       for (let j = 0; j < questions[i].answers.length; j++) {
//         await supabase.from("question_answers").insert({
//           questionId: questionId,
//           answer: questions[i].answers[j],
//           isCorrect: questions[i].correctIndex === j,
//         });
//       }
//       console.log(response, "question");
//     }
//   };

//   const handleQuestion = (value, field, questionIndex) => {
//     const updatedQuestion = questions.map((question, index) => {
//       if (questionIndex === index) {
//         return { ...question, [field]: value };
//       } else {
//         return question;
//       }
//     });

//     setQuestions(updatedQuestion);
//   };

//   const handleAnswers = (questionIndex, answerIndex, value) => {
//     const updatedQuestions = questions.map((question, qIndex) => {
//       if (qIndex === questionIndex) {
//         return {
//           ...question,
//           answers: question.answers.map((answer, aIndex) => {
//             if (aIndex === answerIndex) {
//               return value;
//             } else {
//               return answer;
//             }
//           }),
//         };
//       } else {
//         return question;
//       }
//     });
//     setQuestions(updatedQuestions);
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         question: "",
//         point: 0,
//         answers: ["", "", "", ""],
//         correctIndex: 0,
//       },
//     ]);
//   };
//     const handleRedirect = (quizId) => {
//     router.push(`/quiz2`)
//   }
//   const deleteQuestion = () => {
  
//   }

//   return (
//     <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
//       {/* Quiz name + create */}
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
//         <div className="flex-1 space-y-2">
//           <Label htmlFor="quiz-name">Quiz name</Label>
//           <Input
//             id="quiz-name"
//             placeholder="e.g. World capitals"
//             onChange={(e) => handleQuizName(e)}
//             value={quiz}
//           />
//         </div>
//         <Button onClick={handleRedirect}>Quizzes</Button>
//         <Button onClick={createQuiz} className="sm:w-auto">
//           Create quiz
//         </Button>
//       </div>

//       {/* Questions */}
//       <div className="space-y-4">
//         {questions.map((question, questionIndex) => {
//           return (
//             <Card key={questionIndex}>
//               <CardHeader className="pb-4">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-base">
//                     Question {questionIndex + 1}
//                   </CardTitle>
//                   <Badge variant="secondary">
//                     {question.point} {question.point === 1 ? "point" : "points"}
//                   </Badge>
//                 </div>
//                 <CardDescription>
//                   Tick the box next to the correct answer.
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="space-y-5">
//                 <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
//                   <div className="space-y-2">
//                     <Label htmlFor={`question-${questionIndex}`}>Question</Label>
//                     <Input
//                       id={`question-${questionIndex}`}
//                       placeholder="question..."
//                       value={question.question}
//                       onChange={(e) =>
//                         handleQuestion(e.target.value, "question", questionIndex)
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor={`point-${questionIndex}`}>Points</Label>
//                     <Input
//                       id={`point-${questionIndex}`}
//                       placeholder="point"
//                       type="number"
//                       min={0}
//                       value={question.point}
//                       onChange={(event) =>
//                         handleQuestion(
//                           Number(event.target.value),
//                           "point",
//                           questionIndex,
//                         )
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Answers</Label>
//                   <div className="space-y-2">
//                     {question.answers.map((answer, answerIndex) => {
//                       const isCorrect = question.correctIndex === answerIndex;
//                       return (
//                         <div
//                           key={answerIndex}
//                           className={`flex items-center gap-3 rounded-md border p-2 transition-colors ${
//                             isCorrect
//                               ? "border-green-500/60 bg-green-500/5"
//                               : "border-border"
//                           }`}
//                         >
//                           <Checkbox
//                             checked={isCorrect}
//                             aria-label={`Mark answer ${answerIndex + 1} as correct`}
//                             onCheckedChange={() =>
//                               handleQuestion(
//                                 answerIndex,
//                                 "correctIndex",
//                                 questionIndex,
//                               )
//                             }
//                           />
//                           <Input
//                             className="border-0 shadow-none focus-visible:ring-0"
//                             placeholder="answer..."
//                             value={answer}
//                             onChange={(e) =>
//                               handleAnswers(
//                                 questionIndex,
//                                 answerIndex,
//                                 e.target.value,
//                               )
//                             }
//                           />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <Button variant="outline" onClick={addQuestion} className="w-full">
//         <Plus className="mr-2 h-4 w-4" />
//         Add question
//       </Button>
//     </div>
//   );
// };

// export default Quizy;