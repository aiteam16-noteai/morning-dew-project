import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

interface LandingNavProps {
  onGetStarted: () => void;
}

export function LandingNav({ onGetStarted }: LandingNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="Holy AI"
            className="h-10 w-auto rounded"
          />
        </div>        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            onClick={onGetStarted}
            data-testid="button-nav-get-started"
            className="font-medium"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
