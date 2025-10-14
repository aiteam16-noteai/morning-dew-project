import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Holy AI helped me discover profound wisdom that guides my daily decisions.",
      author: "Priya Sharma",
      role: "Wisdom Seeker"
    },
    {
      quote: "The voice interface makes learning from ancient texts accessible and engaging.",
      author: "Arjun Patel",
      role: "Student"
    },
    {
      quote: "I love how it connects timeless teachings with my modern life challenges.",
      author: "Maya Krishnan",
      role: "Professional"
    }
  ];

  return (
    <section className="py-20 px-4 bg-celestial-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Voices from Fellow Seekers
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands on their journey to wisdom
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
