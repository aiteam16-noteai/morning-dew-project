import OpenAI from 'openai';

/**
 * Backend OpenAI service - keeps API keys server-side only
 */
class OpenAIService {
  private client: OpenAI | null = null;

  /**
   * Get OpenAI client instance (lazy initialization)
   */
  private getClient(): OpenAI {
    if (!this.client) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY not set in environment variables');
      }
      this.client = new OpenAI({ apiKey });
    }
    return this.client;
  }

  /**
   * Generate embeddings for texts
   */
  async generateEmbeddings(
    texts: string[],
    model?: string
  ): Promise<number[][]> {
    const client = this.getClient();
    const embedModel = model || process.env.OPENAI_EMBED_MODEL || 'text-embedding-3-small';
    const batchSize = parseInt(process.env.OPENAI_BATCH_SIZE || '96');

    console.log(`🔤 Embedding ${texts.length} texts using model: ${embedModel}`);

    const vectors: number[][] = [];
    for (let start = 0; start < texts.length; start += batchSize) {
      const batch = texts.slice(start, start + batchSize);
      const response = await client.embeddings.create({
        model: embedModel,
        input: batch
      });
      vectors.push(...response.data.map(d => d.embedding));
    }

    console.log(`✅ Generated ${vectors.length} embeddings with dimension ${vectors[0]?.length || 0}`);
    return vectors;
  }

  /**
   * Generate chat completion
   */
  async generateChatCompletion(
    messages: Array<{ role: string; content: string }>,
    model?: string,
    temperature?: number
  ): Promise<string> {
    const client = this.getClient();
    const chatModel = model || process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

    console.log('🤖 Calling OpenAI with', messages.length, 'messages');

    const response = await client.chat.completions.create({
      model: chatModel,
      messages: messages as any,
      temperature: temperature ?? 0.2
    });

    const answer = (response.choices[0].message.content || '').trim();
    console.log('✅ OpenAI response:', answer.substring(0, 200) + (answer.length > 200 ? '...' : ''));

    return answer;
  }
}

export const openaiService = new OpenAIService();
