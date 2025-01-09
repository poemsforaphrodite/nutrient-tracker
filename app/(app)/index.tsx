import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Dashboard
      </Text>
      <Text variant="bodyLarge" style={{ marginBottom: 20, textAlign: 'center' }}>
        Welcome to your nutrition tracking dashboard.
      </Text>
      <Button mode="outlined" onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  );
}
