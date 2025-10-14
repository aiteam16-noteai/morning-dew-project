import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Trophy } from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  icon: "award" | "star" | "trophy";
  earned: boolean;
}

interface BadgeDisplayProps {
  badges: BadgeItem[];
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  const iconMap = {
    award: Award,
    star: Star,
    trophy: Trophy
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          {badges.map((badge) => {
            const Icon = iconMap[badge.icon];
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-1 ${
                  badge.earned ? "opacity-100" : "opacity-30"
                }`}
                data-testid={`badge-${badge.id}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  badge.earned ? "bg-primary/10" : "bg-muted"
                }`}>
                  <Icon className={`h-6 w-6 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <span className="text-xs text-center">{badge.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
