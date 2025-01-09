import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { useProfile } from '../../../hooks/useProfile';
import { router } from 'expo-router';
import { Colors } from '../../../constants/Colors';

export default function EditProfileScreen() {
  const { profile, loading, updateProfile } = useProfile();
  const [fullName, setFullName] = useState(profile?.full_name || '');

  const handleSave = async () => {
    await updateProfile({
      full_name: fullName,
    });
    router.back();
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
      <View style={styles.form}>
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          mode="outlined"
          style={styles.input}
          outlineColor={Colors.primary}
          activeOutlineColor={Colors.secondary}
          textColor={Colors.textDark}
        />

        <Text style={styles.emailText}>Email: {profile?.email}</Text>

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          buttonColor={Colors.primary}
        >
          Save Changes
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
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: Colors.inputBackground,
  },
  emailText: {
    marginBottom: 20,
    color: Colors.textMedium,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: 8,
  },
}); 