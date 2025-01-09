/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  primary: '#5D8736',
  secondary: '#809D3C',
  accent: '#A9C46C',
  background: '#F4FFC3',
  
  // Derived colors
  primaryDark: '#4A6C2B',
  secondaryDark: '#667D30',
  accentLight: '#BFDA82',
  
  // Text colors
  textDark: '#2C4119',
  textMedium: '#5D8736',
  textLight: '#809D3C',
  
  // UI colors
  success: '#5D8736',
  error: '#D32F2F',
  warning: '#FFA000',
  info: '#809D3C',
  
  // Component specific
  cardBackground: '#FFFFFF',
  divider: '#A9C46C',
  inputBackground: '#FFFFFF',
  switchTrackActive: '#A9C46C',
  switchThumbActive: '#5D8736',
  buttonDisabled: '#C7C7C7',
  
  // Status bar
  statusBar: '#4A6C2B',
} as const;

export const Theme = {
  light: {
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.cardBackground,
    text: Colors.textDark,
    border: Colors.divider,
    notification: Colors.primary,
  },
  dark: {
    primary: Colors.primaryDark,
    background: Colors.textDark,
    card: '#1E2B11',
    text: Colors.background,
    border: Colors.primary,
    notification: Colors.accent,
  },
} as const;
