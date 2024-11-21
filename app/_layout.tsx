import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import store from "../redux/store";
import { Provider } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Login from "@/components/auth/Login";
import localStorage from "@/components/utils/localStorage";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [isLogin, setIsLogin] = useState(false);
  const loginFun = async (token: string) => {
    await localStorage.setItem("userToken", token);
    setIsLogin(true);
  }


  useEffect(() => {
    const checkToken = async () => {
      const token = await localStorage.getItem("userToken");
      console.log("bug>>>>>>>>>>>>>>>", token);
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, [isLogin]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <App /> : <Login loginFun={loginFun}/>;
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            animated={true}
            backgroundColor="black"
            barStyle={"light-content"}
          />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
