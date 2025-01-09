import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(app)');
      } else {
        router.replace('/auth/login');
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Redirecting...</Text>
    </View>
  );
}
