import { WelcomeBadge } from "@/components/WelcomeBadge";

interface WelcomePageProps {
  onContinue: () => void;
}

export default function WelcomePage({ onContinue }: WelcomePageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-celestial-gradient">
      <WelcomeBadge onContinue={onContinue} />
    </div>
  );
}
