
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://unarftwylyumtnugmten.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuYXJmdHd5bHl1bXRudWdtdGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzYxMDUsImV4cCI6MjA1OTc1MjEwNX0.sJuGmCc8sswyok1geKzXNb-O3TStnC6739kjDlACFHA';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: localStorage,
  }
});
