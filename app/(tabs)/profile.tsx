import { StyleSheet, ScrollView, View, Switch } from 'react-native';
import { Text } from '@/components/Themed';
import { Card, List } from 'react-native-paper';
import { useState } from 'react';

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <List.Item
            title="Notifications"
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Dietary Preferences" />
        <Card.Content>
          <List.Item
            title="Vegetarian"
            left={() => <List.Icon icon="leaf" />}
          />
          <List.Item
            title="Allergies"
            left={() => <List.Icon icon="alert-circle" />}
          />
          <List.Item
            title="Daily Goals"
            left={() => <List.Icon icon="target" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Account" />
        <Card.Content>
          <List.Item
            title="Edit Profile"
            left={() => <List.Icon icon="account-edit" />}
          />
          <List.Item
            title="Privacy Settings"
            left={() => <List.Icon icon="shield-account" />}
          />
          <List.Item
            title="Help & Support"
            left={() => <List.Icon icon="help-circle" />}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    margin: 10,
    elevation: 4,
  },
}); 