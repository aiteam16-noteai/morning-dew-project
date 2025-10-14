import { createClient } from '@supabase/supabase-js';

/**
 * Get Supabase client instance
 * @returns {any | null} Supabase client or null if configuration is missing
 */
export function getSupabaseClient() {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_SERVICE_ROLE || import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!url || !key) {
            return null;
        }
        
        return createClient(url, key);
    } catch (error) {
        throw new Error(`Supabase package not installed. Add to package.json: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Health check for Supabase connection
 * @returns {string | null} "ok" if connection is successful, null otherwise
 */
export function healthcheck() {
    const client = getSupabaseClient();
    if (client === null) {
        return null;
    }
    return "ok";
}
