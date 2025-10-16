import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { openaiService } from "./openai-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // OpenAI embeddings endpoint
  app.post("/api/openai/embeddings", async (req, res) => {
    try {
      const { texts, model } = req.body;

      if (!texts || !Array.isArray(texts)) {
        return res.status(400).json({ error: 'texts must be an array of strings' });
      }

      const embeddings = await openaiService.generateEmbeddings(texts, model);
      res.json({ embeddings });
    } catch (error) {
      console.error('OpenAI embeddings error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // OpenAI chat completion endpoint
  app.post("/api/openai/chat", async (req, res) => {
    try {
      const { messages, model, temperature } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'messages must be an array' });
      }

      const response = await openaiService.generateChatCompletion(messages, model, temperature);
      res.json({ response });
    } catch (error) {
      console.error('OpenAI chat error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // Qdrant proxy endpoint to handle CORS issues
  app.post("/api/qdrant/search", async (req, res) => {
    try {
      const { collection, vector, limit = 5, score_threshold = 0.1 } = req.body; // Lowered threshold
      
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
      
      console.log('📤 Sending to Qdrant:', JSON.stringify(searchPayload, null, 2));
      
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
      console.log('✅ Qdrant response:', JSON.stringify(data, null, 2));
      res.json(data);
    } catch (error) {
      console.error('Qdrant proxy error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
