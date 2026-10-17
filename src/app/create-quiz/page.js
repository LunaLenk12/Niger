"use client"

import { useState } from "react";
import { supabaseClient } from "../lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription,} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
      {/* Quiz name + create */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="quiz-name">Quiz name</Label>
          <Input
            id="quiz-name"
            placeholder="e.g. World capitals"
            onChange={(e) => handleQuizName(e)}
            value={quiz}
          />
        </div>
        <Button onClick={handleRedirect}>Quizzes</Button>
        <Button onClick={createQuiz} className="sm:w-auto">
          Create quiz
        </Button>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, questionIndex) => {
          return (
            <Card key={questionIndex}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Question {questionIndex + 1}
                  </CardTitle>
                  <Badge variant="secondary">
                    {question.point} {question.point === 1 ? "point" : "points"}
                  </Badge>
                </div>
                <CardDescription>
                  Tick the box next to the correct answer.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                  <div className="space-y-2">
                    <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                    <Input
                      id={`question-${questionIndex}`}
                      placeholder="question..."
                      value={question.question}
                      onChange={(e) =>
                        handleQuestion(e.target.value, "question", questionIndex)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`point-${questionIndex}`}>Points</Label>
                    <Input
                      id={`point-${questionIndex}`}
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

                <div className="space-y-2">
                  <Label>Answers</Label>
                  <div className="space-y-2">
                    {question.answers.map((answer, answerIndex) => {
                      const isCorrect = question.correctIndex === answerIndex;
                      return (
                        <div
                          key={answerIndex}
                          className={`flex items-center gap-3 rounded-md border p-2 transition-colors ${
                            isCorrect
                              ? "border-green-500/60 bg-green-500/5"
                              : "border-border"
                          }`}
                        >
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
                          />
                          <Input
                            className="border-0 shadow-none focus-visible:ring-0"
                            placeholder="answer..."
                            value={answer}
                            onChange={(e) =>
                              handleAnswers(
                                questionIndex,
                                answerIndex,
                                e.target.value,
                              )
                            }
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

      <Button variant="outline" onClick={addQuestion} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add question
      </Button>
    </div>
  );
};

export default Quizy;