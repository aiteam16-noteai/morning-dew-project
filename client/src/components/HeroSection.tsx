import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@assets/stock_images/celestial_cosmic_eye_765fb739.jpg";

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl space-y-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/attached_assets/image (3)_1760441802526.png" 
              alt="Holy AI Logo" 
              className="h-32 md:h-40 w-auto"
            />
          </div>
          
          <p className="text-3xl md:text-4xl font-semibold text-white tracking-wide">
            Ancient Wisdom, Modern Answers
          </p>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connect deeply with your roots and get real answers to life's questions—instantly.
          </p>
          
          <div className="pt-6">
            <Button 
              size="lg" 
              variant="default"
              onClick={onGetStarted}
              data-testid="button-get-started"
              className="text-lg px-10 py-7 font-medium"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
