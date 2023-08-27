import { Slot } from 'expo-router';
import { useDeviceContext } from 'twrnc';

import { GradientBackgroundWrapper } from '@/components/ui/GradientBackgroundWrapper';
import { ErrorBoundary } from '@/context/error/ErrorBoundary';
import { ErrorProvider } from '@/context/error/ErrorContext';
import { SupabaseProvider } from '@/context/supabase/SupabaseProvider';
import tw from '@/lib/tailwind';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import * as SecureStore from 'expo-secure-store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient } from 'react-query';

const customAsyncPersister = {
  persistClient: async (client: QueryClient) => {
    const stringifiedClient = JSON.stringify(client);
    await SecureStore.setItemAsync('queryClient', stringifiedClient);
  },
  restoreClient: async () => {
    const stringifiedClient = await SecureStore.getItemAsync('queryClient');
    return stringifiedClient ? JSON.parse(stringifiedClient) : undefined;
  },
};

export default function Root() {
  useDeviceContext(tw);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60, // 1 hour
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  return (
    <ErrorProvider>
      <ErrorBoundary>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: customAsyncPersister }}
          onSuccess={() => {
            queryClient.resumePausedMutations().then(() => {
              queryClient.invalidateQueries();
            });
          }}
        >
          <SupabaseProvider>
            <GestureHandlerRootView style={tw`flex-1`}>
              <GradientBackgroundWrapper>
                <SafeAreaProvider>
                  <Slot />
                </SafeAreaProvider>
              </GradientBackgroundWrapper>
            </GestureHandlerRootView>
          </SupabaseProvider>
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </ErrorProvider>
  );
}
