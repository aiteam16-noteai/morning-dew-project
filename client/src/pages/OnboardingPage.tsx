import { OnboardingQuiz } from "@/components/OnboardingQuiz";

interface OnboardingPageProps {
  userName: string;
  onComplete: (answers: string[]) => void;
}

export default function OnboardingPage({ userName, onComplete }: OnboardingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-celestial-gradient">
      <OnboardingQuiz userName={userName} onComplete={onComplete} />
    </div>
  );
}
