# Nutrient Tracker Application Structure

## Directory Structure

```
nutrient-tracker/
├── app/                    # Main application directory (Expo Router)
│   ├── (app)/             # Protected app routes
│   │   └── index.tsx      # Main dashboard
│   ├── auth/              # Authentication routes
│   │   └── login.tsx      # Login page
│   ├── _layout.tsx        # Root layout
│   └── __tests__/         # Test files
├── components/            # Reusable components
│   ├── Themed.tsx         # Theme components
│   └── ThemedText.tsx     # Themed text components
├── lib/                   # Utility libraries
│   └── storage.ts         # Cross-platform storage utility
```

## Key Components

### Core Infrastructure
- **Storage System**: Cross-platform storage solution supporting web and native platforms
- **Authentication**: User authentication system
- **Theming**: Custom theming system for consistent UI

### Application Layout
- Root layout (`_layout.tsx`): Base application structure
- Protected layout (`(app)/_layout.tsx`): Authenticated user layout
- Public routes: Login and authentication flows

### Components
- Themed components for consistent styling
- Platform-specific adaptations

## Technology Stack

- **Frontend Framework**: React Native/Expo
- **Navigation**: Expo Router
- **Storage**: 
  - Web: LocalStorage
  - Native: AsyncStorage
- **Platform Support**: 
  - iOS
  - Android
  - Web 