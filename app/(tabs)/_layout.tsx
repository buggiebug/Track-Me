import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform, StatusBar } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tabIconSelected,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-transaction"
        options={{
          headerShown: true,
          title: 'Add Transaction',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: "black",
          headerStatusBarHeight: 0,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'add-circle' : 'add-circle-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
