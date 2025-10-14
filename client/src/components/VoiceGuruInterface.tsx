import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Send, Volume2, AlertCircle, CheckCircle, MicOff, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHolyAI } from "@/hooks/useHolyAI";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import { speechToText, textToSpeech, playAudio } from "@/lib/voiceService";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function VoiceGuruInterface() {
  const [question, setQuestion] = useState("");
  const [voiceCharacter, setVoiceCharacter] = useState("calm-mentor");
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioResponseBlob, setAudioResponseBlob] = useState<Blob | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  
  // Voice recording hook
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    audioBlob, 
    error: recordingError 
  } = useVoiceRecording();
  
  // Use HolyAI hook for actual AI functionality
  const { 
    askQuestion, 
    isLoading, 
    error, 
    lastResponse, 
    clearError, 
    isConfigured, 
    healthStatus 
  } = useHolyAI('guru-user-123'); // Collection will be read from env

  // Handle voice recording start/stop
  const handleVoiceInput = async () => {
    if (isRecording) {
      stopRecording();
      setIsListening(false);
    } else {
      startRecording();
      setIsListening(true);
    }
  };

  // Handle speech-to-text conversion
  const handleTranscribeAudio = async () => {
    if (!audioBlob) return;
    
    setIsTranscribing(true);
    try {
      const text = await speechToText(audioBlob);
      setTranscribedText(text);
      setQuestion(text); // Set the transcribed text as the question
    } catch (err) {
      console.error('Failed to transcribe audio:', err);
    } finally {
      setIsTranscribing(false);
    }
  };

  // Handle text-to-speech for AI response
  const handlePlayResponse = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      // Use pre-generated audio if available, otherwise generate on-demand
      let audioBlob = audioResponseBlob;
      if (!audioBlob && lastResponse?.answer) {
        console.log('🎵 Generating audio on-demand...');
        audioBlob = await textToSpeech(lastResponse.answer);
        setAudioResponseBlob(audioBlob);
      }
      
      if (audioBlob) {
        await playAudio(audioBlob);
      }
    } catch (err) {
      console.error('Failed to play response:', err);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || isLoading) return;

    try {
      const response = await askQuestion(question);
      setQuestion(''); // Clear the input after successful question
      
      // Start TTS conversion in parallel (don't wait for it)
      if (response?.answer) {
        generateAudioResponse(response.answer);
      }
    } catch (err) {
      console.error('Failed to ask question:', err);
    }
  };

  // Generate audio response in background
  const generateAudioResponse = async (text: string) => {
    setIsGeneratingAudio(true);
    try {
      console.log('🎵 Generating audio response in background...');
      const audioBlob = await textToSpeech(text);
      // Store the audio blob for later playback
      setAudioResponseBlob(audioBlob);
      console.log('✅ Audio response ready');
    } catch (err) {
      console.error('Failed to generate audio response:', err);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Show configuration error if not configured
  if (!isConfigured) {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Ask the Guru - Configuration Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please configure your API keys in the .env file to use the Guru feature:
              <ul className="mt-2 space-y-1 text-sm">
                <li>• VITE_OPENAI_API_KEY: Required for AI responses</li>
                <li>• VITE_QDRANT_URL: Required for knowledge base search</li>
                <li>• VITE_QDRANT_COLLECTION: Collection name (default: documents)</li>
                <li>• VITE_SUPABASE_URL: Optional for conversation memory</li>
                <li>• VITE_SUPABASE_ANON_KEY: Optional for conversation memory</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Ask the Guru
            {healthStatus && (
              <span className="text-xs text-muted-foreground">({healthStatus})</span>
            )}
          </div>
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
                placeholder="Ask your question here or use voice input..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[100px] resize-none"
                data-testid="textarea-question"
              />
              
              {/* Voice Recording Section */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="icon"
                    onClick={handleVoiceInput}
                    disabled={isTranscribing}
                    data-testid="button-voice-record"
                  >
                    {isRecording ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>
                  
                  {audioBlob && (
                    <Button
                      variant="outline"
                      onClick={handleTranscribeAudio}
                      disabled={isTranscribing}
                      data-testid="button-transcribe"
                    >
                      {isTranscribing ? (
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      ) : (
                        "Transcribe"
                      )}
                    </Button>
                  )}
                  
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
                
                {/* Recording Status */}
                {isRecording && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <div className="animate-pulse h-2 w-2 bg-red-600 rounded-full" />
                    Recording... Click mic to stop
                  </div>
                )}
                
                {transcribedText && (
                  <div className="p-2 bg-blue-50 rounded text-sm">
                    <strong>Transcribed:</strong> {transcribedText}
                  </div>
                )}
                
                {recordingError && (
                  <div className="text-sm text-red-600">
                    {recordingError}
                  </div>
                )}
              </div>
            </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              {error}
              <Button variant="outline" size="sm" onClick={clearError}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <AnimatePresence>
          {(lastResponse || isLoading) && (
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
                  ) : lastResponse ? (
                    <div className="space-y-3">
                      {/* AI Response with Audio Controls */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-foreground leading-relaxed flex-1" data-testid="text-guru-response">
                            {lastResponse.answer}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePlayResponse}
                            disabled={isPlaying}
                            className="shrink-0"
                          >
                            {isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                        {isGeneratingAudio && (
                          <div className="flex items-center gap-2 text-sm text-orange-600">
                            <div className="animate-spin h-3 w-3 border-2 border-orange-600 border-t-transparent rounded-full" />
                            Generating audio response...
                          </div>
                        )}
                        
                        {isPlaying && (
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <div className="animate-pulse h-2 w-2 bg-blue-600 rounded-full" />
                            Playing audio response...
                          </div>
                        )}
                        
                        {audioResponseBlob && !isGeneratingAudio && !isPlaying && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <div className="h-2 w-2 bg-green-600 rounded-full" />
                            Audio ready to play
                          </div>
                        )}
                      </div>

                      {lastResponse.contexts && lastResponse.contexts.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">Sources:</p>
                          {lastResponse.contexts.slice(0, 2).map((context, index) => (
                            <div key={index} className="text-xs text-muted-foreground italic">
                              • {context.file_name || 'Ancient Wisdom'} (Score: {context.score.toFixed(3)})
                            </div>
                          ))}
                        </div>
                      )}

                      {lastResponse.conversation_id && (
                        <p className="text-xs text-muted-foreground">
                          Conversation ID: {lastResponse.conversation_id}
                        </p>
                      )}
                    </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
