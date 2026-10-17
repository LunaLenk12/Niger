"use client"

import { useState } from "react";
import { supabaseClient } from "../lib/supabase/client";



const Quizy = () => {
 const supabase = supabaseClient();

 const [quiz , setQuiz] = useState("");
 const [questions, setQuestions] = useState([
   {
      question: "",
      point: 0, 
      answers: ["", "", "", ""],
      correctIndex: 0 ,
   } 
 ])
const handleQuizName = (event) => setQuiz(event.target.value);

const createQuiz = async () => {
    const response = await supabase.from("quiz").insert({
        quizName: quiz,
    })
    .select("*")
    .single();
    const quizId = response.data.id;

    for (let i = 0 ; i < questions.length; i++) {
       const response =  await supabase.from("quiz_questions").insert({
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
            isCorrect: questions[i].correctIndex === j
         })
        }
        console.log(response, "question")
    }
}
const handleQuestion = (value, field, questionIndex) => {
    const updatedQuestion = questions.map((question, index) =>{
        if (questionIndex === index) {
            return { ...question, [field]: value};
        }else {
            return question;
        } 
    });

    setQuestions(updatedQuestion);
}
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
            })
        }
      } else {
        return question;
      }
    })
    setQuestions(updatedQuestions);
}
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
            question: "",
            point: 0, 
             answers: ["", "", "", ""],
            correctIndex: 0 ,    
            }
        ])
    }
return (
    <div>
        <input
        placeholder="quiz name"
        onChange={(e) => handleQuizName(e)}
        value={quiz}
        /> 
        <button onClick={createQuiz}>Create Quiz</button>
        <div>
            {questions.map((question, questionIndex) => {
                return (
                 <div>
                   <input
                    placeholder="question..."
                    value={question.question}
                    onChange={(e) =>
                        handleQuestion(e.target.value, "question", questionIndex)
                    }
                     />
                     <input
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
                     {question.answers.map((answer, answerIndex) => {
                        return (
                            <div>
                                <input
                                type="checkbox"
                                onChange={(e) =>
                                    handleQuestion(
                                        answerIndex,
                                        "correctIndex",
                                        questionIndex,
                                    )
                                }
                                />
                                <input
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
                        )
                     })}
                 </div>

                )
            })}
        </div>
        <button onClick={addQuestion}>add question</button>
    </div>
)
}
export default Quizy
