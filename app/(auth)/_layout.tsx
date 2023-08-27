import { BackgroundWrapper } from '@/components/ui/BackgroundWrapper';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <BackgroundWrapper>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </BackgroundWrapper>
  );
}
