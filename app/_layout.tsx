import { Slot } from 'expo-router';
import { useDeviceContext } from 'twrnc';

import { ErrorBoundary } from '@/context/error/ErrorBoundary';
import { ErrorProvider } from '@/context/error/ErrorContext';
import { SupabaseProvider } from '@/context/supabase/SupabaseProvider';
import tw from '@/lib/tailwind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Root() {
  useDeviceContext(tw);
  const queryClient = new QueryClient();

  return (
    <ErrorProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <SupabaseProvider>
            <GestureHandlerRootView style={tw`flex-1`}>
              <SafeAreaProvider>
                <Slot />
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </SupabaseProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ErrorProvider>
  );
}
