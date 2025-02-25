import React from 'react';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';

import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { Database } from '@/types/database';
import {
  EmailOtpType,
  SupabaseClient,
  createClient,
} from '@supabase/supabase-js';
import { useError } from '../error/useError';
import { SupabaseContext } from './SupabaseContext';
import { supabaseKey, supabaseUrl } from './supabase';

setupURLPolyfill();
// We are using Expo Secure Store to persist session info
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

// This hook will protect the route access based on user authentication.
function useProtectedRoute(isLoggedIn: boolean) {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();
  React.useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not logged in and the initial segment is not anything in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      // Redirect to the sign-up page.
      router.replace('/sign-up');
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect away from the sign-up page.
      router.replace('/');
    }
  }, [isLoggedIn, segments, navigationState]);
}

type SupabaseProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);
  const { setError } = useError();

  const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setError(error);
  };

  const verifyOtp = async (
    email: string,
    token: string,
    type: EmailOtpType,
  ) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });
    if (error) setError(error);
    setLoggedIn(true);
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error);
    setLoggedIn(true);
  };

  const resetPasswordForEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error);
    setLoggedIn(false);
  };

  const getSession = async () => {
    const result = await supabase.auth.getSession();
    setLoggedIn(result.data.session !== null);
  };

  const useSupabaseQuery = <T,>(
    queryKey: string,
    queryFn: (supabase: SupabaseClient) => Promise<T>,
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
  ) => {
    const queryFunction = () => queryFn(supabase); // Wrap it in another function
    const { data, isLoading, isError } = useQuery(
      queryKey,
      queryFunction,
      options,
    );
    return { data, isLoading, isError };
  };

  const useSupabaseMutation = <T, U>(
    mutationFn: (supabase: SupabaseClient<Database>, data: U) => Promise<T>,
    options?: UseMutationOptions<T, unknown, U>,
  ) => {
    const mutationFunction = (data: U) => mutationFn(supabase, data); // Wrap it in another function
    const { mutateAsync, isLoading, isError, data } = useMutation<
      T,
      unknown,
      U
    >(mutationFunction, options);
    return { mutateAsync, isLoading, isError, data };
  };

  React.useEffect(() => {
    getSession();
    console.log('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useProtectedRoute(isLoggedIn);

  return (
    <SupabaseContext.Provider
      value={{
        isLoggedIn,
        signInWithPassword,
        verifyOtp,
        signUp,
        resetPasswordForEmail,
        signOut,
        useSupabaseQuery,
        useSupabaseMutation,
      }}
    >
      {props.children}
    </SupabaseContext.Provider>
  );
};
