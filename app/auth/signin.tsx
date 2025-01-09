import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Sign In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
