import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Client is only created if credentials are configured — graceful degradation
export const supabase =
  supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL'
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConfigured = !!supabase;
