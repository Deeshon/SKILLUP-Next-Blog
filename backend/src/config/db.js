import { createClient } from '@supabase/supabase-js'

// Create supabase client for interacting with the database
export const supabase = createClient("https://uieboxckokztrtobjjuj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZWJveGNrb2t6dHJ0b2JqanVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NDIxODQsImV4cCI6MjA1NTAxODE4NH0.uthnumLcWIS9QEu16Ug9q3ZPGsDxrgllb0P1U7wz7c0")
