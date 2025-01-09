import { StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from '@/components/Themed';
import { Card } from 'react-native-paper';

export default function HistoryScreen() {
  // This would be populated with real data from your backend
  const mealHistory = [
    {
      id: 1,
      date: 'Today 12:30 PM',
      meal: 'Grilled Chicken Salad',
      nutrients: {
        protein: '25g',
        carbs: '15g',
        fats: '12g',
      },
    },
    {
      id: 2,
      date: 'Today 9:00 AM',
      meal: 'Oatmeal with Berries',
      nutrients: {
        protein: '8g',
        carbs: '45g',
        fats: '5g',
      },
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meal History</Text>
      
      {mealHistory.map((meal) => (
        <Card key={meal.id} style={styles.card}>
          <Card.Title
            title={meal.meal}
            subtitle={meal.date}
          />
          <Card.Content>
            <Text style={styles.nutrientText}>
              Protein: {meal.nutrients.protein} • 
              Carbs: {meal.nutrients.carbs} • 
              Fats: {meal.nutrients.fats}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  card: {
    margin: 10,
    elevation: 4,
  },
  nutrientText: {
    color: '#666',
    marginTop: 8,
  },
}); 