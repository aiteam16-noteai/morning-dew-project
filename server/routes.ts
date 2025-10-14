import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Qdrant proxy endpoint to handle CORS issues
  app.post("/api/qdrant/search", async (req, res) => {
    try {
      const { collection, vector, limit = 5, score_threshold = 0.1 } = req.body; // Lowered threshold
      
      console.log(`🔍 Qdrant search: collection=${collection}, limit=${limit}, score_threshold=${score_threshold}, vector_dim=${vector?.length}`);
      
      const qdrantUrl = process.env.VITE_QDRANT_URL || 'https://cd717fd8-a2e2-48c4-af22-212127d12200.eu-west-2-0.aws.cloud.qdrant.io';
      const qdrantApiKey = process.env.VITE_QDRANT_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.OYXXJ_566-i2O5fi5neFDlfsgOWdwhbBy8ozUC-IK5o';
      
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
