import { Text, View } from 'react-native';

import { useSupabase } from '@/context/supabase/useSupabase';
import { t } from '@/lib/localization';
import tw from '@/lib/tailwind';

export default function Index() {
  const { signOut } = useSupabase();
  tw.color('foreground');
  return (
    <View style={tw`flex-1 items-center justify-center `}>
      <Text
        style={tw`h1 text-foreground dark:text-dark-foreground`}
        onPress={() => signOut()}
      >
        {t('signOut.buttonLabel')}
      </Text>
    </View>
  );
}
