import { useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { VoiceGuruInterface } from "@/components/VoiceGuruInterface";
import { WisdomCard } from "@/components/WisdomCard";
import { StreakTracker } from "@/components/StreakTracker";
import { BadgeDisplay } from "@/components/BadgeDisplay";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");

  const wisdomItems = [
    {
      title: "Morning Wisdom",
      excerpt: "The mind is restless and difficult to restrain, but it is subdued by practice.",
      source: "Bhagavad Gita 6:35"
    },
    {
      title: "Daily Reflection",
      excerpt: "Set thy heart upon thy work, but never on its reward.",
      source: "Bhagavad Gita 2:47"
    }
  ];

  const badges = [
    { id: "welcome", name: "Welcome", icon: "award" as const, earned: true },
    { id: "week", name: "Week Streak", icon: "star" as const, earned: true },
    { id: "wisdom", name: "Wisdom Seeker", icon: "trophy" as const, earned: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {activeTab === "home" && (
          <>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground">Continue your journey to wisdom</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {wisdomItems.map((item, idx) => (
                  <WisdomCard 
                    key={idx}
                    {...item}
                    onExplore={() => console.log("Explore:", item.title)}
                  />
                ))}
              </div>
              
              <div className="space-y-4">
                <StreakTracker currentStreak={7} longestStreak={12} />
                <BadgeDisplay badges={badges} />
              </div>
            </div>
          </>
        )}
        
        {activeTab === "guru" && (
          <div className="flex justify-center pt-8">
            <VoiceGuruInterface />
          </div>
        )}
        
        {activeTab === "wisdom" && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Wisdom Feed</h1>
            <div className="grid md:grid-cols-2 gap-4">
              {wisdomItems.map((item, idx) => (
                <WisdomCard 
                  key={idx}
                  {...item}
                  onExplore={() => console.log("Explore:", item.title)}
                />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === "streaks" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Your Progress</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <StreakTracker currentStreak={7} longestStreak={12} />
              <BadgeDisplay badges={badges} />
            </div>
          </div>
        )}
        
        {(activeTab === "profile" || activeTab === "settings") && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              {activeTab === "profile" ? "Profile" : "Settings"}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === "profile" 
                ? "Manage your profile and preferences" 
                : "Customize your Holy AI experience"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
