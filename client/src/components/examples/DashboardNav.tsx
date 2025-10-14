import { useState } from "react";
import { ThemeProvider } from "../ThemeProvider";
import { DashboardNav } from "../DashboardNav";

export default function DashboardNavExample() {
  const [activeTab, setActiveTab] = useState("home");
  
  return (
    <ThemeProvider>
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
    </ThemeProvider>
  );
}
