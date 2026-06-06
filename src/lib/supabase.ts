import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Robust check to avoid build-time crashes when placeholders or empty values are loaded
if (!supabaseUrl || !supabaseUrl.startsWith("http") || supabaseUrl.includes("YOUR_SUPABASE_URL")) {
  supabaseUrl = "https://placeholder-project.supabase.co";
}

if (!supabaseAnonKey || supabaseAnonKey.includes("YOUR_SUPABASE_ANON_KEY")) {
  supabaseAnonKey = "placeholder-anon-key";
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
