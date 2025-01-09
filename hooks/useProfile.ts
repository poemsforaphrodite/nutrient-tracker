import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types/user';
import { useAuth } from '../context/auth';

export function useProfile() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session?.user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session?.user?.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (settings: {
    notifications?: boolean;
    theme?: 'light' | 'dark' | 'system';
  }) => {
    if (!profile) return { error: 'No profile found' };

    const updates = {
      notification_settings: {
        ...profile.notification_settings,
        ...(settings.notifications !== undefined && {
          meal_reminders: settings.notifications,
          weekly_summary: settings.notifications,
          achievement_alerts: settings.notifications,
        }),
      },
      ...(settings.theme && { theme_preference: settings.theme }),
    };

    return updateProfile(updates);
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    updateSettings,
    refreshProfile: fetchProfile,
  };
} 