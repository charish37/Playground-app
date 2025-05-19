import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          backgroundColor: 'white',
          borderRadius: 30,
          height: 70,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" size={28} color={focused ? 'orange' : 'gray'} />
          ),
        }}
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person-outline" size={28} color={focused ? 'orange' : 'gray'} />
          ),
        }}
      />

      {/* Custom Center Callout Button */}
      <Tab.Screen 
        name="Callout"
        component={HomeScreen} // You can replace with a custom callout screen if needed
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity style={styles.calloutWrapper} {...props}>
              <Image
                source={require('../assets/callout.png')}
                style={styles.calloutButton}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen 
        name="Messages" 
        component={MessageScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={28} color={focused ? 'orange' : 'gray'} />
          ),
        }}
      />

      <Tab.Screen 
        name="Notifications" 
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="notifications-outline" size={28} color={focused ? 'orange' : 'gray'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  calloutWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 30 : 35,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  calloutButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
});
