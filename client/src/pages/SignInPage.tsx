import { SignInCard } from "@/components/SignInCard";

interface SignInPageProps {
  onGoogleSignIn: () => void;
  onGuestContinue: () => void;
}

export default function SignInPage({ onGoogleSignIn, onGuestContinue }: SignInPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-celestial-gradient">
      <SignInCard 
        onGoogleSignIn={onGoogleSignIn}
        onGuestContinue={onGuestContinue}
      />
    </div>
  );
}
