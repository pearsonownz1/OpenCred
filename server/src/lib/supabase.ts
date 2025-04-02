import { createClient } from '@supabase/supabase-js'
import { supabaseServiceKey, supabaseUrl } from '../config'



// Create Supabase client with service role key for backend operations
export const supabase = createClient(supabaseUrl as string, supabaseServiceKey as string)