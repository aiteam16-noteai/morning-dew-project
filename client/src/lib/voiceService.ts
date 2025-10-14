const ELEVENLABS_API_KEY = 'sk_c05da3cf513e18ec154c9c5347f40d010ffdd08626f3d6e9';
const VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb'; // Default voice ID

/**
 * Convert speech to text using ElevenLabs STT API
 * @param audioBlob - Audio blob from recording
 * @returns Promise<string> - Transcribed text
 */
export async function speechToText(audioBlob: Blob): Promise<string> {
  try {
    console.log('🎤 Converting speech to text...');
    
    const formData = new FormData();
    formData.append('model_id', 'scribe_v1');
    formData.append('file', audioBlob, 'recording.wav');

    const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`STT API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.text || '';
    
    console.log('✅ Speech to text result:', text);
    return text;
  } catch (error) {
    console.error('❌ Speech to text failed:', error);
    throw new Error(`Failed to convert speech to text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Convert text to speech using ElevenLabs TTS API
 * @param text - Text to convert to speech
 * @param voiceId - Voice ID to use (optional)
 * @returns Promise<Blob> - Audio blob
 */
export async function textToSpeech(text: string, voiceId: string = VOICE_ID): Promise<Blob> {
  try {
    console.log('🔊 Converting text to speech...', `Text length: ${text.length} chars`);
    
    // Truncate very long text to avoid API limits
    const maxLength = 5000; // ElevenLabs has character limits
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: truncatedText,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('TTS API error:', response.status, errorText);
      throw new Error(`TTS API error: ${response.status} ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    console.log('✅ Text to speech completed, audio size:', audioBlob.size, 'bytes');
    return audioBlob;
  } catch (error) {
    console.error('❌ Text to speech failed:', error);
    throw new Error(`Failed to convert text to speech: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Play audio blob
 * @param audioBlob - Audio blob to play
 * @returns Promise<void>
 */
export async function playAudio(audioBlob: Blob): Promise<void> {
  try {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = (error) => {
        URL.revokeObjectURL(audioUrl);
        reject(error);
      };
      audio.play();
    });
  } catch (error) {
    console.error('❌ Audio playback failed:', error);
    throw new Error(`Failed to play audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
