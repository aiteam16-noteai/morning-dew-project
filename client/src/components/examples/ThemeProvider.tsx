import { ThemeProvider } from "../ThemeProvider";
import { Button } from "@/components/ui/button";

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-4 space-y-4">
        <Button>Theme Provider Active</Button>
      </div>
    </ThemeProvider>
  );
}
