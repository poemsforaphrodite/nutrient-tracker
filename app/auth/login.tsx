import { StyleSheet, View, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

// Initialize WebBrowser for iOS
if (Platform.OS !== 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const redirectUri = makeRedirectUri({
  scheme: 'nutrienttracker',
  preferLocalhost: true,
});

export default function LoginScreen() {
  useEffect(() => {
    const initBrowser = async () => {
      if (Platform.OS !== 'web') {
        await WebBrowser.warmUpAsync();
      }
    };

    initBrowser();
    checkSession();

    return () => {
      if (Platform.OS !== 'web') {
        WebBrowser.coolDownAsync();
      }
    };
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
          redirectTo: Platform.OS === 'web' ? window.location.origin : redirectUri,
          skipBrowserRedirect: Platform.OS !== 'web',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      if (data?.url) {
        if (Platform.OS === 'web') {
          window.location.href = data.url;
          return;
        }

        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUri,
          {
            showInRecents: true,
            preferEphemeralSession: true,
          }
        );
        
        if (result.type === 'success') {
          const { url } = result;
          if (url) {
            // Parse the URL parameters
            const params = new URLSearchParams(url.split('#')[1]);
            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');
            
            if (access_token && refresh_token) {
              await supabase.auth.setSession({
                access_token,
                refresh_token,
              });
              router.replace('/(app)');
            }
          }
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
