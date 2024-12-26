import { Tabs } from 'expo-router';
import React from 'react';

import { Icons, Icons2, MaterialIcon } from '@/components/utils/Icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tabIconSelected,
        headerShown: true,
        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icons
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="transaction/index"
        options={{
          title: 'Transaction',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerShown: false,
          headerTitleAlign: "center",
          headerTintColor: "black",
          headerStatusBarHeight: 0,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcon
              name={focused ? 'money-off' : 'attach-money'}
              color={color}
            />
          ),
          tabBarLabel: 'Transactions',
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icons
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
