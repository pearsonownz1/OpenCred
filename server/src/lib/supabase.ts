import { createClient } from '@supabase/supabase-js'
import { supabaseServiceKey, supabaseUrl } from '../config';

console.log(supabaseServiceKey, supabaseUrl);



// Create Supabase client with service role key for backend operations
export const supabase = createClient(supabaseUrl as string, supabaseServiceKey as string)