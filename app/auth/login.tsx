import { StyleSheet, View, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';

const redirectUri = makeRedirectUri({
  scheme: 'nutrienttracker',
  path: 'auth/callback',
});

export default function LoginScreen() {
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (session) {
        router.replace('/(app)');
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: Platform.select({
            web: `${window.location.origin}/auth/callback`,
            default: redirectUri,
          }),
          skipBrowserRedirect: Platform.OS !== 'web',
        },
      });

      if (error) throw error;

      if (Platform.OS === 'web' && data?.url) {
        window.location.href = data.url;
      } else if (data?.url) {
        const response = await AuthSession.startAsync({
          authUrl: data.url,
          returnUrl: redirectUri,
        });

        if (response?.type === 'success') {
          router.replace('/(app)');
        }
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Nutrient Tracker
      </Text>
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          style={styles.button}
          onPress={signInWithGoogle}
          icon="google"
        >
          Continue with Google
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  button: {
    width: '100%',
  },
});
