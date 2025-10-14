import { Home, BookOpen, Mic, Flame, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

interface DashboardNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "wisdom", label: "Wisdom Feed", icon: BookOpen },
    { id: "guru", label: "Ask Guru", icon: Mic },
    { id: "streaks", label: "Streaks", icon: Flame },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <EyeLogo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Holy AI</span>
            </div>
            
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  data-testid={`nav-${item.id}`}
                  className="gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          
          <ThemeToggle />
        </div>
        
        <div className="md:hidden flex gap-1 pb-2 overflow-x-auto">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onTabChange(item.id)}
              data-testid={`nav-mobile-${item.id}`}
              className="gap-2 flex-shrink-0"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function EyeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  );
}
