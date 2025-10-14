import { WisdomCard } from "../WisdomCard";

export default function WisdomCardExample() {
  return (
    <div className="p-4 max-w-md">
      <WisdomCard 
        title="Today's Wisdom"
        excerpt="The mind is restless and difficult to restrain, but it is subdued by practice."
        source="Bhagavad Gita 6:35"
        onExplore={() => console.log("Explore wisdom")}
      />
    </div>
  );
}
