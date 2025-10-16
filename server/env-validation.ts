/**
 * Environment variable validation for server startup
 */

interface EnvValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateEnvironment(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required for core AI functionality
  if (!process.env.OPENAI_API_KEY) {
    errors.push('OPENAI_API_KEY is required for AI chat functionality');
  }

  if (!process.env.VITE_QDRANT_URL) {
    errors.push('VITE_QDRANT_URL is required for vector search');
  }

  if (!process.env.VITE_QDRANT_API_KEY) {
    errors.push('VITE_QDRANT_API_KEY is required for vector search');
  }

  // Optional but recommended
  if (!process.env.VITE_ELEVENLABS_API_KEY) {
    warnings.push('VITE_ELEVENLABS_API_KEY not set - voice features will not work');
  }

  if (!process.env.DATABASE_URL) {
    warnings.push('DATABASE_URL not set - database features disabled');
  }

  if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
    warnings.push('Supabase not configured - conversation history disabled');
  }

  // Validate collection name is set
  if (!process.env.VITE_QDRANT_COLLECTION) {
    warnings.push('VITE_QDRANT_COLLECTION not set - defaulting to "data"');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function printEnvironmentStatus(): void {
  const result = validateEnvironment();

  console.log('\n🔍 Environment Variable Validation\n');
  console.log('═'.repeat(60));

  if (result.errors.length > 0) {
    console.log('\n❌ ERRORS (deployment will fail):\n');
    result.errors.forEach(error => console.log(`   • ${error}`));
  }

  if (result.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (optional features disabled):\n');
    result.warnings.forEach(warning => console.log(`   • ${warning}`));
  }

  if (result.isValid && result.warnings.length === 0) {
    console.log('\n✅ All environment variables configured correctly!\n');
  } else if (result.isValid) {
    console.log('\n✅ Core environment variables configured (some optional features disabled)\n');
  } else {
    console.log('\n❌ Environment validation failed - check errors above\n');
  }

  console.log('═'.repeat(60) + '\n');

  if (!result.isValid) {
    console.error('Please set required environment variables before starting the server.');
    process.exit(1);
  }
}
