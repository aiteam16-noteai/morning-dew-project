import { FeatureCard } from "../FeatureCard";
import { Mic } from "lucide-react";

export default function FeatureCardExample() {
  return (
    <div className="p-4">
      <FeatureCard 
        icon={Mic}
        title="Voice-Guru AI"
        description="Ask anything, get conversational answers sourced from ancient classics"
      />
    </div>
  );
}
