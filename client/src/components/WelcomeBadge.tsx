import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Sparkles } from "lucide-react";

interface WelcomeBadgeProps {
  onContinue: () => void;
}

export function WelcomeBadge({ onContinue }: WelcomeBadgeProps) {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md text-center">
          <CardContent className="pt-8 pb-8 space-y-6">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-12 w-12 text-primary" />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                Welcome to Your Wisdom Journey!
                <Sparkles className="h-6 w-6 text-primary" />
              </h2>
              <p className="text-muted-foreground">
                You've earned your first badge. Your personalized wisdom experience is ready!
              </p>
            </div>
            
            <Button 
              size="lg" 
              onClick={onContinue}
              data-testid="button-continue-dashboard"
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
