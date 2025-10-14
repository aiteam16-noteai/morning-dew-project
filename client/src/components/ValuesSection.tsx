import { Shield, Users, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: "Spiritual Neutrality",
      description: "We honor all paths to wisdom without bias or judgment"
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Ancient wisdom accessible to everyone, regardless of background"
    },
    {
      icon: Heart,
      title: "Trust & Privacy",
      description: "Your spiritual journey is personal. We protect your privacy always"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on principles of trust, inclusivity, and spiritual authenticity
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <Card key={idx} className="text-center border-0 bg-transparent">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
