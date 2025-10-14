import { SignInCard } from "../SignInCard";

export default function SignInCardExample() {
  return (
    <div className="p-4 flex items-center justify-center min-h-[500px]">
      <SignInCard 
        onGoogleSignIn={() => console.log("Google Sign In")}
        onGuestContinue={() => console.log("Continue as Guest")}
      />
    </div>
  );
}
