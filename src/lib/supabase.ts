/*
  ── Supabase Setup ──

  To activate the real Supabase connection:

  1. Install the Supabase client:
     npm install @supabase/supabase-js

  2. Copy the environment template and fill in your values:
     cp .env.example .env

  3. Replace the null export below with:

     export const supabase = createClient(
       import.meta.env.VITE_SUPABASE_URL,
       import.meta.env.VITE_SUPABASE_ANON_KEY,
     )
*/

// npm install @supabase/supabase-js
// import { createClient } from "@supabase/supabase-js";

export const supabase = null;
