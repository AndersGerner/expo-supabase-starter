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
    queryFn: (supabase: SupabaseClient) => Promise<T>,
    options?: UseQueryOptions<T>,
  ) => {
    data: T | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  useSupabaseMutation: <T>(
    mutationFn: (supabase: SupabaseClient) => Promise<T>,
    options?: UseMutationOptions<T>,
  ) => {
    mutate: () => void;
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
  useSupabaseMutation: () => ({
    data: undefined,
    isLoading: false,
    isError: false,
    mutate: async () => {},
  }),
});
