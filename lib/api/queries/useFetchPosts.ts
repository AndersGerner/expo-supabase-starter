import { useSupabase } from '@/context/supabase/useSupabase';

/**
 * Custom hook to fetch posts.
 *
 * Usage:
 * const { data, isLoading, isError } = useFetchPosts();
 *
 * To adapt for a new table:
 * 1. Update the type definition to match the new table schema.
 * 2. Update the query function to query the new table.
 */
export const useFetchPosts = () => {
  const { useSupabaseQuery } = useSupabase();

  // Explicitly type the function here
  return useSupabaseQuery('posts', async (supabase) => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return data;
  });
};
