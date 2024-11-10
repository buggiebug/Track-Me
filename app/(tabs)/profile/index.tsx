// app/profile/index.tsx
import { Stack } from 'expo-router';
import ProfileScreen from "@/components/auth/Profile";

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile', headerShown: false }} />
      <ProfileScreen />
    </>
  );
}
