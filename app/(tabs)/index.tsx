import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import { Card } from 'react-native-paper';

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrient Dashboard</Text>
        <Text style={styles.subtitle}>Today's Summary</Text>
      </View>

      <Card style={styles.card}>
        <Card.Title title="Nutrient Status" />
        <Card.Content>
          <View style={styles.nutrientRow}>
            <Text>Protein: 65%</Text>
            <View style={[styles.progressBar, { width: '65%', backgroundColor: '#4CAF50' }]} />
          </View>
          <View style={styles.nutrientRow}>
            <Text>Iron: 45%</Text>
            <View style={[styles.progressBar, { width: '45%', backgroundColor: '#FFC107' }]} />
          </View>
          <View style={styles.nutrientRow}>
            <Text>Vitamin C: 80%</Text>
            <View style={[styles.progressBar, { width: '80%', backgroundColor: '#2196F3' }]} />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Recommendations" />
        <Card.Content>
          <Text>• Add more leafy greens for iron intake</Text>
          <Text>• Consider protein-rich foods for your next meal</Text>
          <Text>• Great job on vitamin C intake!</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  card: {
    margin: 10,
    elevation: 4,
  },
  nutrientRow: {
    marginVertical: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
});
