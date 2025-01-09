import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

class CustomStorage {
  private getWebStorage() {
    if (Platform.OS !== 'web') return null;
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const webStorage = this.getWebStorage();
      if (webStorage) {
        return webStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.warn('Error getting item from storage:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      const webStorage = this.getWebStorage();
      if (webStorage) {
        webStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('Error setting item in storage:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      const webStorage = this.getWebStorage();
      if (webStorage) {
        webStorage.removeItem(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('Error removing item from storage:', error);
    }
  }
}

export const storage = new CustomStorage();
