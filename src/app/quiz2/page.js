"use client"

import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabase/client"
import {Card,CardHeader, CardTitle, CardDescription,} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Quizzes</h1>
        <Badge variant="secondary">{quiz.length} total</Badge>
      </div>

      {quiz.length === 0 ? (
        <p className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
          Loading...
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {quiz.map((item) => {
            return (
              <Card
                key={item.id}
                className="transition-colors hover:bg-muted/50"
                onClick={() => handleRedirect(item.id)}
              >
                <CardHeader>
                    <CardTitle className="text-base">{}</CardTitle>
                  <CardTitle className="text-base">{item.quizName}</CardTitle>
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
  );
}
export default Page