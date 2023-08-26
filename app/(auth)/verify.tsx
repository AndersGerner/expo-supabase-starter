import React from 'react';
import { Text, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

import { Alert, AlertRef } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSupabase } from '@/context/supabase/useSupabase';
import { t } from '@/lib/localization';
import tw from '@/lib/tailwind';

const FormSchema = z.object({
  token: z.string(),
});

export default function Verify() {
  const { verifyOtp } = useSupabase();
  const { email } = useLocalSearchParams();
  const alertRef = React.useRef<AlertRef>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await verifyOtp(email as string, data.token, 'signup');
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    alertRef.current?.showAlert({
      variant: 'default',
      title: t('verify.alert.title'),
      message: t('verify.alert.message'),
    });
  }, []);

  return (
    <SafeAreaView
      style={tw`flex-1 items-center bg-background dark:bg-dark-background p-4`}
    >
      <Alert ref={alertRef} />
      <Text
        style={tw`h1 text-foreground dark:text-dark-foreground self-start mb-5`}
      >
        {t('verify.title')}
      </Text>
      <View style={tw`w-full gap-y-4`}>
        <Controller
          control={control}
          name="token"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('verify.token.label')}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                trigger('token');
                onBlur();
              }}
              errors={errors.token?.message}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="done"
            />
          )}
        />
      </View>
      <View style={tw`w-full gap-y-4 absolute bottom-[50px]`}>
        <Button
          label={t('verify.buttonLabel')}
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
}
