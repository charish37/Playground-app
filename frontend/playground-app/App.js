// App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppStack from './navigation/AppStack';

export default function App() {
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}
