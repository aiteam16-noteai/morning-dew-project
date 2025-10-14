import { LandingNav } from "@/components/LandingNav";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ValuesSection } from "@/components/ValuesSection";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <LandingNav onGetStarted={onGetStarted} />
      <div className="pt-16">
        <HeroSection onGetStarted={onGetStarted} />
        <FeaturesSection />
        <TestimonialsSection />
        <ValuesSection />
        
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands discovering ancient wisdom for modern living
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              data-testid="button-cta-bottom"
              className="text-lg px-10 py-7 font-medium"
            >
              Get Started Now
            </Button>
          </div>
        </section>
        
        <footer className="py-8 px-4 border-t">
          <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
            <p>© 2024 Holy AI. Ancient Wisdom, Modern Answers.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
