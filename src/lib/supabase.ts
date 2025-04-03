import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from '@/config'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
