import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Send, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VoiceGuruInterface() {
  const [question, setQuestion] = useState("");
  const [voiceCharacter, setVoiceCharacter] = useState("calm-mentor");
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    console.log("Voice listening toggled");
  };

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setResponse("The Bhagavad Gita teaches us: 'You have the right to work, but never to the fruit of work.' This ancient wisdom reminds us to focus on our efforts and intentions, not on outcomes we cannot control. In your situation, focus on doing your best work without attachment to specific results.");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Ask the Guru</span>
          <Select value={voiceCharacter} onValueChange={setVoiceCharacter}>
            <SelectTrigger className="w-[180px]" data-testid="select-voice-character">
              <Volume2 className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="calm-mentor" data-testid="voice-calm-mentor">Calm Mentor</SelectItem>
              <SelectItem value="warm-teacher" data-testid="voice-warm-teacher">Warm Teacher</SelectItem>
              <SelectItem value="wise-elder" data-testid="voice-wise-elder">Wise Elder</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Ask your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px] resize-none"
            data-testid="textarea-question"
          />
          <div className="flex gap-2">
            <Button
              variant={isListening ? "default" : "outline"}
              size="icon"
              onClick={handleVoiceInput}
              data-testid="button-voice-guru"
            >
              <Mic className={`h-5 w-5 ${isListening ? "animate-pulse" : ""}`} />
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleAskQuestion}
              disabled={!question.trim() || isLoading}
              data-testid="button-ask-question"
            >
              <Send className="mr-2 h-5 w-5" />
              Ask Question
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {(response || isLoading) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-muted rounded-md"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  <span className="text-muted-foreground">Consulting ancient wisdom...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-foreground leading-relaxed" data-testid="text-guru-response">
                    {response}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    Source: Bhagavad Gita, Chapter 2, Verse 47
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
