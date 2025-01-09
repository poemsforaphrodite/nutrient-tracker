import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Card, List, Switch, Button, ActivityIndicator } from 'react-native-paper';
import { useProfile } from '../../hooks/useProfile';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/Colors';

export default function ProfileScreen() {
  const { profile, loading, updateSettings } = useProfile();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  const handleNotificationToggle = async (value: boolean) => {
    await updateSettings({ notifications: value });
  };

  const handleThemeToggle = async (value: boolean) => {
    await updateSettings({ theme: value ? 'dark' : 'light' });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{profile?.full_name || 'Set up your profile'}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
      </View>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <List.Item
            title="Notifications"
            description="Enable push notifications"
            descriptionStyle={styles.listDescription}
            right={() => (
              <Switch
                value={profile?.notification_settings?.meal_reminders ?? false}
                onValueChange={handleNotificationToggle}
                color={Colors.switchThumbActive}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            description="Toggle dark theme"
            descriptionStyle={styles.listDescription}
            right={() => (
              <Switch
                value={profile?.theme_preference === 'dark'}
                onValueChange={handleThemeToggle}
                color={Colors.switchThumbActive}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Title title="Dietary Preferences" titleStyle={styles.cardTitle} />
        <Card.Content>
          <List.Item
            title="Vegetarian"
            left={() => <List.Icon icon="leaf" color={Colors.secondary} />}
            right={() => (
              <Switch
                value={profile?.dietary_preferences?.vegetarian ?? false}
                onValueChange={async (value) => {
                  await updateProfile({
                    dietary_preferences: {
                      ...profile?.dietary_preferences,
                      vegetarian: value,
                    },
                  });
                }}
                color={Colors.switchThumbActive}
              />
            )}
          />
          <List.Item
            title="Allergies"
            description={profile?.allergies?.join(', ') || 'None set'}
            descriptionStyle={styles.listDescription}
            left={() => <List.Icon icon="alert-circle" color={Colors.secondary} />}
            onPress={() => router.push('/profile/allergies')}
          />
          <List.Item
            title="Daily Goals"
            description="Set your nutrition targets"
            descriptionStyle={styles.listDescription}
            left={() => <List.Icon icon="target" color={Colors.secondary} />}
            onPress={() => router.push('/profile/goals')}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Title title="Account" titleStyle={styles.cardTitle} />
        <Card.Content>
          <List.Item
            title="Edit Profile"
            left={() => <List.Icon icon="account-edit" color={Colors.secondary} />}
            onPress={() => router.push('/profile/edit')}
          />
          <List.Item
            title="Privacy Settings"
            left={() => <List.Icon icon="shield-account" color={Colors.secondary} />}
            onPress={() => router.push('/profile/privacy')}
          />
          <List.Item
            title="Help & Support"
            left={() => <List.Icon icon="help-circle" color={Colors.secondary} />}
            onPress={() => router.push('/profile/support')}
          />
        </Card.Content>
      </Card>

      <View style={styles.signOutContainer}>
        <Button 
          mode="outlined" 
          onPress={handleSignOut} 
          style={styles.signOutButton}
          textColor={Colors.primary}
          buttonColor={Colors.background}
        >
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.textDark,
  },
  email: {
    fontSize: 16,
    color: Colors.textMedium,
  },
  card: {
    margin: 10,
    elevation: 4,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
  },
  cardTitle: {
    color: Colors.textDark,
    fontSize: 18,
    fontWeight: '600',
  },
  listDescription: {
    color: Colors.textMedium,
    fontSize: 14,
  },
  signOutContainer: {
    padding: 20,
  },
  signOutButton: {
    marginTop: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
}); 