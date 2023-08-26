import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { t } from '@/lib/localization';
import { useRouter } from 'expo-router';
import React, { ReactNode, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { ErrorContext } from './ErrorContext';
import { useNetworkStatus } from './useNetworkStatus';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { error, clearErrors } = useContext(ErrorContext);
  const isOnline = useNetworkStatus();
  const router = useRouter();

  useEffect(() => {
    if (isOnline) {
      clearErrors();
    }
  }, [isOnline]);

  if (error) {
    return (
      <View>
        <Text>{t('errorBoundary.errorOccurred')}</Text>
        <Text>{error.message}</Text>
        {isOnline ? (
          <Button
            label={t('errorBoundary.goBack')}
            onPress={() => {
              router.back();
            }}
          />
        ) : (
          <View>
            <Text>{t('errorBoundary.attemptingToReconnect')}</Text>
            <Spinner />
          </View>
        )}
      </View>
    );
  }

  return <>{children}</>;
};
