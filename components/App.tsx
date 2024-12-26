import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Auth from "@/components/auth/Auth";
import localStorage from "@/components/utils/localStorage";
import { selectUserDetails } from "../redux/reselect/reselectData";
import AddTransaction from "./expense/AddTransaction";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { isLoggedInUser } = useSelector(selectUserDetails);


    useEffect(() => {
        const checkToken = async () => {
            const token = await localStorage.getItem("userToken");
            if (!(token && token.length > 0)) {
                setIsAuthenticated(false);
            }
        };
        checkToken();
    });

    useEffect(() => {
        // console.log("isLoggedInUser >>>", isLoggedInUser);
        const checkToken = async () => {
            const token = await localStorage.getItem("userToken");
            setIsAuthenticated(!!token);
        };

        checkToken();
    }, [!isLoggedInUser]);

    if (isAuthenticated === null) {
        return null;
    }


    return (
        <>
            {
                !isAuthenticated ? <Auth /> :
                    <>
                        <SafeAreaProvider>
                            <SafeAreaView style={{ flex: 1 }}>
                                <StatusBar
                                    animated={true}
                                    backgroundColor="black"
                                    barStyle={"light-content"}
                                />
                                <Stack>
                                    <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
                                    <Stack.Screen name="transaction/add-transaction" options={{ title: "Add Transaction" }} />
                                    <Stack.Screen name="+not-found" />
                                </Stack>
                            </SafeAreaView>
                        </SafeAreaProvider>
                    </>
            }
        </>
    )
}
