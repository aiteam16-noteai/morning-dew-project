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
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">Holy AI</h1>
          </div>
          
          <p className="text-2xl md:text-3xl font-semibold text-white">
            Ancient Wisdom, Modern Answers
          </p>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Connect deeply with your roots and get real answers to life's questions—instantly.
          </p>
          
          <div className="pt-4">
            <Button 
              size="lg" 
              variant="default"
              onClick={onGetStarted}
              data-testid="button-get-started"
              className="text-lg px-8 py-6"
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

function Eye({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  );
}
