import { Database } from '@/types/database';
import { EmailOtpType, SupabaseClient } from '@supabase/supabase-js';
import { createContext } from 'react';
import { UseMutationOptions, UseQueryOptions } from 'react-query';

type SupabaseContextProps = {
  isLoggedIn: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  verifyOtp: (
    email: string,
    token: string,
    type: EmailOtpType,
  ) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  useSupabaseQuery: <T>(
    queryKey: string,
    queryFn: (supabase: SupabaseClient<Database>) => Promise<T>,
    options?: UseQueryOptions<T>,
  ) => {
    data: T | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  useSupabaseMutation: <T, U>(
    mutationFn: (supabase: SupabaseClient<Database>, data: U) => Promise<T>,
    options?: UseMutationOptions<T, unknown, U>,
  ) => {
    mutateAsync: (data: U) => Promise<T>;
    isLoading: boolean;
    isError: boolean;
    data: T | undefined;
  };
};

export const SupabaseContext = createContext<SupabaseContextProps>({
  isLoggedIn: false,
  signUp: async () => {},
  verifyOtp: async () => {},
  signInWithPassword: async () => {},
  resetPasswordForEmail: async () => {},
  signOut: async () => {},
  useSupabaseQuery: () => ({
    data: undefined,
    isLoading: false,
    isError: false,
  }),
  useSupabaseMutation: <T,>() => ({
    data: undefined,
    isLoading: false,
    isError: false,
    mutateAsync: async () => Promise.resolve(undefined as unknown as T),
  }),
});
