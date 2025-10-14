import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  const initials = author.split(' ').map(n => n[0]).join('');
  
  return (
    <Card className="hover-elevate">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <p className="text-muted-foreground mb-6 italic">{quote}</p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
