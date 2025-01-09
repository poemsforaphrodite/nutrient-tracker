import { createClient } from '@supabase/supabase-js';
import { storage } from './storage';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import { Platform } from 'react-native';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});
