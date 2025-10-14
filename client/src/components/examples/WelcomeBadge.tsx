import { WelcomeBadge } from "../WelcomeBadge";

export default function WelcomeBadgeExample() {
  return <WelcomeBadge onContinue={() => console.log("Continue to Dashboard")} />;
}
