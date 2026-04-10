import { createClient } from '@supabase/supabase-js'



const supabaseUrl = 'https://iuzobmedogumgaszsoho.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1em9ibWVkb2d1bWdhc3pzb2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDk2ODEsImV4cCI6MjA5MTMyNTY4MX0.mvrpBXKaykRjBgCGGQHaIwLFqHGOuprCZHhJSNPcjF0'



export const supabase = createClient(supabaseUrl, supabaseAnonKey);
