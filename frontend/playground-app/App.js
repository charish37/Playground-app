import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen'; // optional
import { AuthProvider, AuthContext } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) return null; // Or splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <>
            {/* Authenticated Screens */}
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
