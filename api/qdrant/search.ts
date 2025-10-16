import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel serverless function for Qdrant search proxy
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
    const { collection, vector, limit = 5, score_threshold = 0.1 } = req.body;

    console.log(`🔍 Qdrant search: collection=${collection}, limit=${limit}, score_threshold=${score_threshold}, vector_dim=${vector?.length}`);

    const qdrantUrl = process.env.VITE_QDRANT_URL;
    const qdrantApiKey = process.env.VITE_QDRANT_API_KEY;

    if (!qdrantUrl || !qdrantApiKey) {
      console.error('❌ Qdrant configuration missing');
      return res.status(500).json({
        error: 'Qdrant is not properly configured. Please set VITE_QDRANT_URL and VITE_QDRANT_API_KEY environment variables.'
      });
    }

    const searchPayload = {
      vector,
      limit,
      with_payload: true,
      score_threshold
    };

    console.log('📤 Sending to Qdrant');

    const response = await fetch(`${qdrantUrl}/collections/${collection}/points/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': qdrantApiKey
      },
      body: JSON.stringify(searchPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Qdrant API error:', response.status, errorText);
      throw new Error(`Qdrant API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Qdrant response received');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Qdrant proxy error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
