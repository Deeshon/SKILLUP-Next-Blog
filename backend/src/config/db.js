import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

// Create supabase client for interacting with the database
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
