import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakTracker({ currentStreak, longestStreak }: StreakTrackerProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2 pb-2">
        <CardTitle className="text-sm font-medium">Your Streak</CardTitle>
        <Flame className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold" data-testid="text-current-streak">{currentStreak}</div>
          <div className="text-sm text-muted-foreground">days</div>
        </div>
        <div className="mt-2">
          <Badge variant="secondary" className="text-xs">
            Best: {longestStreak} days
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
