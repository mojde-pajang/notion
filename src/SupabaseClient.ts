import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAPI = import.meta.env.VITE_SUPABASE_API;

if (!supabaseURL || !supabaseAPI) {
  throw new Error("Supabase URL or API are not available");
}

export const supabase = createClient(supabaseURL, supabaseAPI);
