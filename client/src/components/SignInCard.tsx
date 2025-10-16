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
          <img
            src="/logo.jpeg"
            alt="Holy AI Logo"
            className="h-20 w-auto rounded-lg"
          />
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
