import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

import { FormInput } from '@/components/form/FormInput';
import { Alert, AlertRef } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useSupabase } from '@/context/supabase/useSupabase';
import { t } from '@/lib/localization';
import tw from '@/lib/tailwind';
import { isError } from '@/types/guards';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { SubmitHandler, useForm } from 'react-hook-form';

const FormSchema = z.object({
  email: z.string().email(t('login.email.errors.invalid')),
  password: z
    .string()
    .min(8, t('login.password.errors.minLength'))
    .max(64, t('login.password.errors.maxLength')),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Login() {
  const { signInWithPassword } = useSupabase();
  const router = useRouter();
  const alertRef = React.useRef<AlertRef>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signInWithPassword(data.email, data.password);
    } catch (error) {
      if (isError(error)) {
        alertRef.current?.showAlert({
          variant: 'destructive',
          title: t('general.error'),
          message: error.message,
        });
      }
    }
  };

  return (
    <SafeAreaView
      style={tw`flex-1 items-center bg-background dark:bg-dark-background p-4`}
    >
      <Alert ref={alertRef} />
      <Text
        style={tw`h1 text-foreground dark:text-dark-foreground self-start mb-5`}
      >
        {t('login.title')}
      </Text>
      <View style={tw`w-full gap-y-4`}>
        <FormInput
          control={control}
          name="email"
          label={t('login.email.label')}
          placeholder={t('login.email.placeholder')}
          errors={errors.email?.message}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <FormInput
          control={control}
          name="password"
          label={t('login.password.label')}
          placeholder={t('login.password.placeholder')}
          errors={errors.password?.message}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      <View style={tw`w-full gap-y-4 absolute bottom-[50px]`}>
        <Button
          label={t('login.buttonLabel')}
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
        <Text
          style={tw`muted text-center`}
          onPress={() => {
            router.back();
          }}
        >
          {t('login.noAccount')}
        </Text>
      </View>
    </SafeAreaView>
  );
}
