import { Slot } from 'expo-router';
import { useDeviceContext } from 'twrnc';

import { SupabaseProvider } from '@/context/SupabaseProvider';
import tw from '@/lib/tailwind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Root() {
  useDeviceContext(tw);

  return (
    <SupabaseProvider>
      <GestureHandlerRootView style={tw`flex-1`}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </SupabaseProvider>
  );
}
