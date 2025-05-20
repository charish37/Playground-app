// AppStack.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator'; 
import { AuthContext } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) return null; // Optional: Add splash screen here

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          <>
            <Stack.Screen name="MainApp" component={BottomTabNavigator} />
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
