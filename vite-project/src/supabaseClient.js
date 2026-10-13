import {createClient} from '@supabase/supabase-js'

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseKey || !supabaseURL)
    {
        throw new Error('Missing Supabase environment variables')
    }

export const supabase = createClient(supabaseURL, supabaseKey)