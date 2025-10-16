import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

/**
 * Vercel serverless function for OpenAI embeddings
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { texts, model } = req.body;

    if (!texts || !Array.isArray(texts)) {
      return res.status(400).json({ error: 'texts must be an array of strings' });
    }

    // Get OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not set');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Initialize OpenAI client
    const client = new OpenAI({ apiKey });
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

    console.log(`✅ Generated ${vectors.length} embeddings`);

    return res.status(200).json({ embeddings: vectors });
  } catch (error) {
    console.error('OpenAI embeddings error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
