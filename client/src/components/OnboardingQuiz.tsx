import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Mic, ArrowRight } from "lucide-react";

const questions = [
  {
    question: "What brings you to Holy AI today?",
    options: [
      "Seeking life guidance",
      "Learning about ancient wisdom",
      "Spiritual growth",
      "Just exploring"
    ]
  },
  {
    question: "How familiar are you with ancient Indian texts?",
    options: [
      "Complete beginner",
      "Heard about them",
      "Read some parts",
      "Well-versed"
    ]
  },
  {
    question: "What format do you prefer for learning?",
    options: [
      "Audio/Voice",
      "Reading text",
      "Visual stories",
      "Mix of all"
    ]
  },
  {
    question: "How often would you like wisdom reminders?",
    options: [
      "Daily",
      "Few times a week",
      "Weekly",
      "I'll check myself"
    ]
  },
  {
    question: "What area of life needs guidance most?",
    options: [
      "Career & purpose",
      "Relationships",
      "Personal growth",
      "Peace & balance"
    ]
  }
];

interface OnboardingQuizProps {
  userName: string;
  onComplete: (answers: string[]) => void;
}

export function OnboardingQuiz({ userName, onComplete }: OnboardingQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      onComplete(newAnswers);
    }
  };

  const handleVoiceInput = () => {
    setIsVoiceActive(!isVoiceActive);
    console.log("Voice input toggled");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome, {userName}! 
          </CardTitle>
          <CardDescription>
            Let's personalize your wisdom journey with a few questions
          </CardDescription>
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} data-testid={`progress-quiz-${currentQuestion + 1}`} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {questions[currentQuestion].question}
            </h3>
            
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {questions[currentQuestion].options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${idx}`}
                    data-testid={`radio-option-${idx}`}
                  />
                  <Label 
                    htmlFor={`option-${idx}`} 
                    className="cursor-pointer flex-1 py-2"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleVoiceInput}
              className={isVoiceActive ? "border-primary" : ""}
              data-testid="button-voice-input"
            >
              <Mic className={`h-5 w-5 ${isVoiceActive ? "text-primary" : ""}`} />
            </Button>
            
            <Button 
              className="flex-1" 
              size="lg"
              onClick={handleNext}
              disabled={!selectedAnswer}
              data-testid="button-next-question"
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Complete"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
