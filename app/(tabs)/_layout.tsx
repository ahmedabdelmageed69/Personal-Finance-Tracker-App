import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import { TransactionsProvider } from "@/context/TransactionsContext";

export default function RootLayout() {
  return (
    <TransactionsProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Transactions",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="money-bill-transfer"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="summary"
          options={{
            headerShown: false,
            title: "Summary",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="pie-chart" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </TransactionsProvider>
  );
}
