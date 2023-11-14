import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rrevkztdfkwyzvibaael.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZXZrenRkZmt3eXp2aWJhYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0OTk5MTksImV4cCI6MjAxNTA3NTkxOX0.RXGkwW73kSEs1Rb_XwpZ8KBu8lajlDk34AY5qnyAduY'
export const supabase = createClient(supabaseUrl, supabaseKey)