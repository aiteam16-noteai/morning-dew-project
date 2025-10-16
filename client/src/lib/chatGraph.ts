import { getSupabaseClient, healthcheck } from './supabaseHelpers';

/**
 * OpenAI operations are now handled by the backend to keep API keys secure.
 * All OpenAI calls go through /api/openai/* endpoints.
 */

/**
 * Embed texts using OpenAI embeddings via backend API
 * @param {string[]} texts - Array of texts to embed
 * @param {string | null} model - Embedding model to use
 * @returns {Promise<number[][]>} Array of embedding vectors
 */
async function _embedTexts(texts: string[], model: string | null = null) {
    try {
        console.log(`🔤 Embedding ${texts.length} texts via backend`);

        const response = await fetch('/api/openai/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                texts,
                model
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `Embeddings API error: ${response.status}`);
        }

        const data = await response.json();
        const vectors = data.embeddings;

        console.log(`✅ Generated ${vectors.length} embeddings with dimension ${vectors[0]?.length || 0}`);
        return vectors;
    } catch (error) {
        console.error('❌ Embedding failed:', error);
        throw new Error(`Failed to generate embeddings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Search Qdrant collection for similar vectors
 * @param {string} collection - Collection name
 * @param {number[]} queryVector - Query vector
 * @param {number} limit - Maximum number of results
 * @param {number | null} scoreThreshold - Minimum score threshold
 * @returns {Promise<any[]>} Array of search results
 */
async function _searchQdrant(collection: string, queryVector: number[], limit: number = 6, scoreThreshold: number | null = null) {
    // Use backend proxy to avoid CORS issues
    const response = await fetch('/api/qdrant/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            collection,
            vector: queryVector,
            limit,
            score_threshold: scoreThreshold || 0.1  // Lower threshold to get more results
        })
    });

    if (!response.ok) {
        throw new Error(`Qdrant search failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.result || []; // Qdrant returns { result: [...], status: "ok" }
    
    console.log('🔍 Qdrant returned', results.length, 'results');
    if (results.length > 0) {
        console.log('📄 First result from Qdrant:', {
            score: results[0].score,
            file_name: results[0].payload?.file_name,
            text_preview: results[0].payload?.text?.substring(0, 100) + '...'
        });
    }
    
    const contexts: any[] = [];
    for (const point of results) {
        const payload = point.payload || {};
        contexts.push({
            text: payload.text || '',
            score: parseFloat(point.score || 0.0),
            source: payload.source,
            file_name: payload.file_name,
            point_id: point.id ? String(point.id) : null
        });
    }
    return contexts;
}

/**
 * Format system prompt for the chat
 * @returns {string} Formatted system prompt
 */
function _formatSystemPrompt() {
    return (
        "You are Holy.AI, an AI-powered voice-based mentor that provides ancient wisdom for modern answers.\n\n" +
        "Your role is to act like a warm, trusted guru — guiding users with practical, conversational insights drawn from Indian scriptures and stories, while keeping responses simple, approachable, and deeply relevant to the user's situation.\n\n" +
        "Always reply in the chosen voice style + with a text transcript.\n\n" +
        "The response must feel personal and conversational, not like a generic chatbot.\n\n" +
        "Connect the wisdom to the user's modern situation (e.g., exams, stress, purpose, relationships).\n\n" +
        "Provide a clickable link/button that takes the user to the exact or most relevant verse.\n\n" +
        "After answering, always suggest next steps such as:\n" +
        "- 'Would you like me to explain this in more detail?'\n" +
        "- 'Do you want to read the exact verse this comes from?'\n" +
        "- 'Would you like a related story?'\n" +
        "- 'Would you like to save this to your wisdom library?'\n\n" +
        "This keeps the conversation natural and continuous.\n\n" +
        "Use the provided context chunks from the knowledge base to support your responses. " +
        "If the answer is not in the context, say you don't know succinctly but still offer to help in other ways."
    );
}

/**
 * Build chat messages for OpenAI API
 * @param {string} userId - User ID
 * @param {string} userQuestion - User's question
 * @param {any[]} retrievedContexts - Retrieved context from Qdrant
 * @param {[string, string][]} pastMessages - Past conversation messages
 * @param {string | null} systemPrompt - Custom system prompt
 * @returns {any[]} Array of message objects
 */
function _buildChatMessages(userId: string, userQuestion: string, retrievedContexts: any[], pastMessages: [string, string][], systemPrompt: string | null = null) {
    const systemContent = systemPrompt || _formatSystemPrompt();
    const contextBlock = retrievedContexts
        .map((c, i) => `[ctx ${i + 1} | score=${(c.score || 0).toFixed(3)}]\n${c.text || ''}`)
        .join('\n\n');
    
    const messages: any[] = [{ role: 'system', content: systemContent }];
    
    if (pastMessages && pastMessages.length > 0) {
        for (const [role, content] of pastMessages.slice(-10)) { // Keep last 10 for brevity/cost
            if (!['user', 'assistant', 'system'].includes(role)) {
                continue;
            }
            messages.push({ role, content });
        }
    }
    
    messages.push({
        role: 'user',
        content: (
            `<user_id>${userId}</user_id>\n` +
            `<question>${userQuestion}</question>\n` +
            `<context>\n${contextBlock}\n</context>\n` +
            'Answer the question using the context above when possible.'
        )
    });
    
    return messages;
}

/**
 * Call GPT with the provided messages via backend API
 * @param {any[]} messages - Array of message objects
 * @param {string | null} model - Chat model to use
 * @returns {Promise<string>} GPT response
 */
async function _callGpt(messages: any[], model: string | null = null) {
    console.log('🤖 Calling OpenAI via backend with', messages.length, 'messages');
    console.log('📝 System prompt preview:', messages[0]?.content?.substring(0, 200) + '...');

    const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages,
            model,
            temperature: 0.2
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Chat API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = (data.response || '').trim();
    console.log('✅ OpenAI response:', answer.substring(0, 200) + (answer.length > 200 ? '...' : ''));

    return answer;
}

/**
 * Lazy initialization of Supabase client
 * @returns {any | null} Supabase client or null if not configured
 */
function _lazySupabase() {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_SERVICE_ROLE || import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
        return null;
    }
    
    return getSupabaseClient();
}

/**
 * Fetch recent conversation history from Supabase
 * @param {string} userId - User ID
 * @param {string | null} conversationId - Conversation ID
 * @param {number} limit - Maximum number of messages to fetch
 * @returns {Promise<[string, string][]>} Array of [role, content] tuples
 */
async function fetchRecentHistory(userId: string, conversationId: string | null = null, limit: number = 10) {
    const sb = _lazySupabase();
    if (!sb) {
        return [];
    }
    
    let query;
    if (conversationId) {
        query = sb
            .from('messages')
            .select('role, content')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true })
            .limit(limit);
    } else {
        query = sb
            .from('messages')
            .select('role, content')
            .eq('user_id', userId)
            .order('created_at', { ascending: true })
            .limit(limit);
    }
    
    const { data } = await query;
    return (data || []).map((d: any) => [d.role || 'user', d.content || '']);
}

/**
 * Upsert conversation and messages to Supabase
 * @param {string} userId - User ID
 * @param {string} userQuestion - User's question
 * @param {string} assistantAnswer - Assistant's answer
 * @param {string | null} conversationId - Existing conversation ID
 * @returns {Promise<string | null>} Conversation ID or null if failed
 */
async function upsertConversationAndMessages(userId: string, userQuestion: string, assistantAnswer: string, conversationId: string | null = null) {
    const sb = _lazySupabase();
    if (!sb) {
        return null;
    }
    
    let convId = conversationId;
    
    if (!convId) {
        const { data: convInsert } = await sb
            .from('conversations')
            .insert({ user_id: userId })
            .select('id');
        convId = convInsert?.[0]?.id;
    }
    
    if (!convId) {
        return null;
    }
    
    await sb
        .from('messages')
        .insert([
            { conversation_id: convId, user_id: userId, role: 'user', content: userQuestion },
            { conversation_id: convId, user_id: userId, role: 'assistant', content: assistantAnswer }
        ]);
    
    return String(convId);
}

/**
 * Main function to answer questions with context
 * @param {string} userId - User ID
 * @param {string} question - User's question
 * @param {string} collection - Qdrant collection name
 * @param {string | null} conversationId - Conversation ID
 * @param {number} k - Number of context chunks to retrieve
 * @param {number | null} scoreThreshold - Minimum score threshold
 * @param {string | null} embedModel - Embedding model
 * @param {string | null} chatModel - Chat model
 * @returns {Promise<any>} Response object with answer, contexts, messages, and conversation_id
 */
export async function answerWithContext(
    userId: string,
    question: string,
    collection: string,
    conversationId: string | null = null,
    k: number = 6,
    scoreThreshold: number | null = null,
    embedModel: string | null = null,
    chatModel: string | null = null
) {
    try {
        console.log(`🚀 Starting answerWithContext for user: ${userId}, question: "${question.substring(0, 50)}..."`);
        
        // 1) Embed the query
        const [queryVector] = await _embedTexts([question], embedModel);
        
        // 2) Retrieve context from Qdrant
        const contexts = await _searchQdrant(collection, queryVector, k, scoreThreshold);
        
        // 3) Get past history (if Supabase configured)
        const history = await fetchRecentHistory(userId, conversationId, 10);
        
        console.log('📚 Contexts found:', contexts.length);
        if (contexts.length > 0) {
            console.log('📄 Context preview:', {
                file_name: contexts[0].file_name,
                score: contexts[0].score,
                text_preview: contexts[0].text.substring(0, 100) + '...'
            });
        } else {
            console.warn('⚠️ No contexts found from Qdrant search - AI will have limited knowledge');
        }
        
        // 4) Call GPT
        const messages = _buildChatMessages(userId, question, contexts, history as [string, string][]);
        const answer = await _callGpt(messages, chatModel);
        
        // 5) Persist messages (if Supabase configured)
        const convId = await upsertConversationAndMessages(userId, question, answer, conversationId);
        
        console.log('✅ Successfully generated answer');
        return {
            answer,
            contexts,
            messages,
            conversation_id: convId || conversationId
        };
    } catch (error) {
        console.error('❌ answerWithContext failed:', error);
        throw new Error(`Failed to generate answer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Re-export healthcheck for convenience
export { healthcheck };
