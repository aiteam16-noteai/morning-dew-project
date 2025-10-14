import { OnboardingQuiz } from "../OnboardingQuiz";

export default function OnboardingQuizExample() {
  return (
    <OnboardingQuiz 
      userName="Arjun"
      onComplete={(answers) => console.log("Quiz completed:", answers)}
    />
  );
}
