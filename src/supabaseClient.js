import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://alpiwaraxijqguwunroa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFscGl3YXJheGlqcWd1d3Vucm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MjY2MjMsImV4cCI6MjA4OTQwMjYyM30.WBaZGe4bEOcKdUXHEUe9nCtgfGO_ego6j0IfTcpiPY0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
