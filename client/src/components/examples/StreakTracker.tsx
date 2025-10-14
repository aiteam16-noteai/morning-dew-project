import { StreakTracker } from "../StreakTracker";

export default function StreakTrackerExample() {
  return (
    <div className="p-4 max-w-sm">
      <StreakTracker currentStreak={7} longestStreak={12} />
    </div>
  );
}
