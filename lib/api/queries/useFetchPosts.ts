import { useSupabase } from '@/context/supabase/useSupabase';

/**
 * Type definition for a Post.
 * This should match the schema of the 'posts' table in your Supabase database.
 */
export type Post = {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
};

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
  return useSupabaseQuery<Post[]>('posts', async (supabase) => {
    const { data, error } = await supabase.from('posts').select('*');
    console.log(
      '🚀 ~ file: useFetchPosts.ts:30 ~ returnuseSupabaseQuery<Post[]> ~ error:',
      error,
    );
    console.log(
      '🚀 ~ file: useFetchPosts.ts:30 ~ returnuseSupabaseQuery<Post[]> ~ data:',
      data,
    );
    if (error) throw error;
    return data as Post[];
  });
};
