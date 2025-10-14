import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";

interface WisdomCardProps {
  title: string;
  excerpt: string;
  source: string;
  onExplore: () => void;
}

export function WisdomCard({ title, excerpt, source, onExplore }: WisdomCardProps) {
  return (
    <Card className="hover-elevate">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground italic">{source}</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onExplore}
            data-testid="button-explore-wisdom"
          >
            Explore
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
