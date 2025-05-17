import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
          backgroundColor: 'white',
          height: 70,
          borderTopWidth: 0,
          elevation: 5,
          flex: 1,
        },
        tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={1} // <<< ✅ This is important!
              {...props}
            />
          ),
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

      {/* Empty Screen for Center Callout Button */}
      <Tab.Screen 
        name="Callout" 
        component={HomeScreen} 
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity   {...props}>
                <View style={styles.calloutWrapper}>
              <Image
                source={require('../assets/callout.png')}
                style={styles.calloutButton}
              />
              </View>
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
    calloutButton: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,             
      height: 80,       
   
    },
    calloutWrapper: {
        bottom: 40,
        elevation: 10,
      shadowColor: 'white',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.95,
      shadowRadius: 10,
    }
  });
  