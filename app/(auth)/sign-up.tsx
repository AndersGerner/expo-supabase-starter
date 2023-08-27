import { useRouter } from 'expo-router';
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
import { SubmitHandler, useForm } from 'react-hook-form';

const FormSchema = z
  .object({
    email: z.string().email(t('signUp.email.errors.invalid')),
    password: z
      .string()
      .min(8, t('signUp.password.errors.minLength'))
      .max(64, t('signUp.password.errors.maxLength'))
      .regex(/^(?=.*[a-z])/, t('signUp.password.errors.lowerCase'))
      .regex(/^(?=.*[A-Z])/, t('signUp.password.errors.upperCase'))
      .regex(/^(?=.*[0-9])/, t('signUp.password.errors.number'))
      .regex(/^(?=.*[!@#$%^&*])/, t('signUp.password.errors.specialChar')),
    confirmPassword: z
      .string()
      .min(8, t('signUp.confirmPassword.errors.notMatch')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t('signUp.confirmPassword.errors.notMatch'),
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof FormSchema>;

export default function SignUp() {
  const { signUp } = useSupabase();
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
      await signUp(data.email, data.password);
      router.push({
        pathname: '/verify',
        params: { email: data.email },
      });
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
        {t('general.welcome')}
      </Text>
      <View style={tw`w-full gap-y-4`}>
        <FormInput
          control={control}
          name="email"
          label={t('signUp.email.label')}
          placeholder={t('signUp.email.placeholder')}
          errors={errors.email?.message}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <FormInput
          control={control}
          name="password"
          label={t('signUp.password.label')}
          placeholder={t('signUp.password.placeholder')}
          errors={errors.password?.message}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        <FormInput
          control={control}
          name="confirmPassword"
          label={t('signUp.confirmPassword.label')}
          placeholder={t('signUp.confirmPassword.placeholder')}
          errors={errors.confirmPassword?.message}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>

      <View style={tw`w-full gap-y-4 absolute bottom-[50px]`}>
        <Button
          label={t('signUp.buttonLabel')}
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
        <Text
          style={tw`muted text-center`}
          onPress={() => {
            router.push('/login');
          }}
        >
          {t('signUp.alreadyHaveAccount')}
        </Text>
      </View>
    </SafeAreaView>
  );
}
