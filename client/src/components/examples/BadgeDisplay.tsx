import { BadgeDisplay } from "../BadgeDisplay";

export default function BadgeDisplayExample() {
  const badges = [
    { id: "welcome", name: "Welcome", icon: "award" as const, earned: true },
    { id: "week", name: "Week Streak", icon: "star" as const, earned: true },
    { id: "wisdom", name: "Wisdom Seeker", icon: "trophy" as const, earned: false }
  ];

  return (
    <div className="p-4 max-w-md">
      <BadgeDisplay badges={badges} />
    </div>
  );
}
