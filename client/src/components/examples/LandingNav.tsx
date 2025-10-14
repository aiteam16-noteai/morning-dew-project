import { ThemeProvider } from "../ThemeProvider";
import { LandingNav } from "../LandingNav";

export default function LandingNavExample() {
  return (
    <ThemeProvider>
      <LandingNav onGetStarted={() => console.log("Get Started clicked")} />
    </ThemeProvider>
  );
}
