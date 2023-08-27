import { useSupabase } from '@/context/supabase/useSupabase';
import { Database } from '@/types/database';

export const useAddPost = () => {
  const { useSupabaseMutation } = useSupabase();

  return useSupabaseMutation<
    Database['public']['Tables']['posts']['Row'],
    Database['public']['Tables']['posts']['Insert']
  >(async (supabase, newPost) => {
    const { data, error } = await supabase.from('posts').insert([newPost]);

    if (error) throw error;

    if (!data) {
      throw new Error('Insert operation returned null');
    }

    return data[0];
  });
};
