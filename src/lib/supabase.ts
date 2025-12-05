import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Create a single supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
