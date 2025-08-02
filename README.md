# Franchise Mobile App

A React Native mobile application built with Expo for franchise management and analytics.

## Features

- **Dashboard**: Overview of franchise metrics and earnings
- **Navigation**: Stack-based navigation between screens
- **UI Components**: Reusable components with Tailwind CSS styling
- **TypeScript**: Full TypeScript support for better development experience

## Project Structure

```
FranchiseApp/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardCards.tsx
│   │   │   ├── MonthlyEarningsChart.tsx
│   │   │   ├── PlansChart.tsx
│   │   │   └── RecentEarningsChart.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   └── screens/
│       ├── Dashboard.tsx
│       └── Lohi.tsx
├── App.tsx
├── global.css
└── package.json
```

## Technologies Used

- **React Native**: Mobile app framework
- **Expo**: Development platform
- **TypeScript**: Type-safe JavaScript
- **NativeWind**: Tailwind CSS for React Native
- **React Navigation**: Navigation library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your preferred platform:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Run on Android device/emulator
- `npm run ios`: Run on iOS device/simulator
- `npm run web`: Run in web browser
- `npm test`: Run tests

## Components

### Dashboard Components
- `DashboardCards`: Reusable card component for displaying metrics
- `MonthlyEarningsChart`: Chart component for monthly earnings
- `PlansChart`: Chart component for plans overview
- `RecentEarningsChart`: Chart component for recent earnings

### Layout Components
- `Header`: App header with navigation menu
- `Footer`: Bottom navigation bar
- `Sidebar`: Side navigation menu

## Screens

- `Dashboard`: Main dashboard with metrics and charts
- `Lohi`: Sample screen (placeholder)

## Styling

The app uses NativeWind (Tailwind CSS for React Native) for styling. All components use className props for styling.

## Development Notes

- All components are TypeScript-based with proper interfaces
- Navigation is handled by React Navigation v7
- The app is configured for both mobile and web platforms
- Tailwind CSS classes are used for consistent styling

## Future Improvements

- Add real data integration
- Implement authentication
- Add more interactive charts
- Implement offline functionality
- Add push notifications 