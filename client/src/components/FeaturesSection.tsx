import { FeatureCard } from "./FeatureCard";
import { Mic, Bell, Flame, BookOpen } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: "Voice-Guru AI",
      description: "Ask anything, get conversational answers sourced from the classics"
    },
    {
      icon: Bell,
      title: "Learning Nudges",
      description: "Smart reminders and daily wisdom bites to keep you growing"
    },
    {
      icon: Flame,
      title: "Progress Streaks",
      description: "Rewards for consistent learning and spiritual growth"
    },
    {
      icon: BookOpen,
      title: "Personalized Guidance",
      description: "Ancient stories and wisdom tailored to modern solutions"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Journey to Ancient Wisdom
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the features that will guide you on your spiritual path
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
