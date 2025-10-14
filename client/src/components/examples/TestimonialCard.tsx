import { TestimonialCard } from "../TestimonialCard";

export default function TestimonialCardExample() {
  return (
    <div className="p-4 max-w-md">
      <TestimonialCard 
        quote="Holy AI helped me discover profound wisdom that guides my daily decisions. The voice interface makes it feel like talking to a wise mentor."
        author="Priya Sharma"
        role="Wisdom Seeker"
      />
    </div>
  );
}
