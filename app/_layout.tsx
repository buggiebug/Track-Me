import { Stack } from "expo-router";
import store from "../redux/store";
import { Provider } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
