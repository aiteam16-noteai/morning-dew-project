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
            <div className="flex items-center">
              <img 
                src="/attached_assets/image (3)_1760441802526.png" 
                alt="Holy AI" 
                className="h-10 w-auto"
              />
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
