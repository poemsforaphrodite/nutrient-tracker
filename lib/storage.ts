import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const isServer = typeof window === 'undefined';
const isWeb = Platform.OS === 'web';

class CustomStorage {
  async getItem(key: string): Promise<string | null> {
    try {
      if (isWeb) {
        if (isServer) return null;
        return window.localStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.warn('Error getting item from storage:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (isWeb) {
        if (isServer) return;
        window.localStorage.setItem(key, value);
        return;
      }
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.warn('Error setting item in storage:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (isWeb) {
        if (isServer) return;
        window.localStorage.removeItem(key);
        return;
      }
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn('Error removing item from storage:', error);
    }
  }
}

export const storage = new CustomStorage();
