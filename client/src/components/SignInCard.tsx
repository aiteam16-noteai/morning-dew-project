import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiGoogle } from "react-icons/si";
import { UserCircle } from "lucide-react";

interface SignInCardProps {
  onGoogleSignIn: () => void;
  onGuestContinue: () => void;
}

export function SignInCard({ onGoogleSignIn, onGuestContinue }: SignInCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <EyeLogo className="h-16 w-16 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome to Holy AI</CardTitle>
        <CardDescription className="text-base">
          Your privacy and spiritual journey matter. Only you see your profile and progress.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          className="w-full" 
          size="lg"
          onClick={onGoogleSignIn}
          data-testid="button-google-signin"
        >
          <SiGoogle className="mr-2 h-5 w-5" />
          Sign in with Google
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          size="lg"
          onClick={onGuestContinue}
          data-testid="button-guest-continue"
        >
          <UserCircle className="mr-2 h-5 w-5" />
          Continue as Guest
        </Button>
        
        <p className="text-xs text-center text-muted-foreground pt-2">
          Guest access provides limited features. Sign in for the full experience.
        </p>
      </CardContent>
    </Card>
  );
}

function EyeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  );
}
