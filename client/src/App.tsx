import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import LandingPage from "@/pages/LandingPage";
import SignInPage from "@/pages/SignInPage";
import OnboardingPage from "@/pages/OnboardingPage";
import WelcomePage from "@/pages/WelcomePage";
import DashboardPage from "@/pages/DashboardPage";
import { HolyAIDemo } from "@/pages/HolyAIDemo";

type AppState = "landing" | "signin" | "onboarding" | "welcome" | "dashboard" | "holyai-demo";

function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [userName, setUserName] = useState("Guest");

  const handleGetStarted = () => {
    setAppState("signin");
  };

  const handleGoogleSignIn = () => {
    setUserName("Arjun");
    setAppState("onboarding");
  };

  const handleGuestContinue = () => {
    setUserName("Guest");
    setAppState("dashboard");
  };

  const handleOnboardingComplete = (answers: string[]) => {
    console.log("Onboarding answers:", answers);
    setAppState("welcome");
  };

  const handleWelcomeContinue = () => {
    setAppState("dashboard");
  };

  const handleHolyAIDemo = () => {
    setAppState("holyai-demo");
  };

  const handleBackToDashboard = () => {
    setAppState("dashboard");
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            {appState === "landing" && <LandingPage onGetStarted={handleGetStarted} />}
            {appState === "signin" && (
              <SignInPage
                onGoogleSignIn={handleGoogleSignIn}
                onGuestContinue={handleGuestContinue}
              />
            )}
            {appState === "onboarding" && (
              <OnboardingPage
                userName={userName}
                onComplete={handleOnboardingComplete}
              />
            )}
            {appState === "welcome" && (
              <WelcomePage onContinue={handleWelcomeContinue} />
            )}
            {appState === "dashboard" && <DashboardPage onHolyAIDemo={handleHolyAIDemo} />}
            {appState === "holyai-demo" && <HolyAIDemo onBack={handleBackToDashboard} />}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
