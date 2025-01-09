export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
  dietary_preferences: {
    vegetarian: boolean;
    vegan: boolean;
    gluten_free: boolean;
    dairy_free: boolean;
  };
  allergies: string[];
  daily_goals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  notification_settings: {
    meal_reminders: boolean;
    weekly_summary: boolean;
    achievement_alerts: boolean;
  };
  theme_preference: 'light' | 'dark' | 'system';
}

export interface UserSettings {
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  measurement_system: 'metric' | 'imperial';
} 