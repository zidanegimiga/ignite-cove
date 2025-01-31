import { Tabs } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import HomeIcon from "@/components/shared/Icons/Home";
import LikedIcon from "@/components/shared/Icons/LikedIcon";
import { useRouter, usePathname} from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import BottomTabProfileItem from "@/components/features/Profile/BottomTabProfileItem";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const [loaded, error] = useFonts({
    'Oswald-Bold': require('@/assets/fonts/oswald/Oswald-Bold.ttf'),
    'Oswald-Regular': require('@/assets/fonts/oswald/Oswald-Regular.ttf'),
    'Oswald-SemiBold': require('@/assets/fonts/oswald/Oswald-SemiBold.ttf'),
    'Oswald-Light': require('@/assets/fonts/oswald/Oswald-Light.ttf'),
  });
  
  useEffect(()=> {
    console.log("Pathname: ", pathname)
  }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            paddingTop: 12,
            height: 80
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
              <HomeIcon active={pathname === "/"}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: pathname === "/" ? 'Oswald-Bold' : 'Oswald-Light',
            fontWeight: 300,
            color: pathname === "/" ? '#EB1E25' : '#484646'
          },
        }}
      />
      <Tabs.Screen
        name="liked"
        options={{
          title: "Liked",
          tabBarIcon: () => (
            <LikedIcon active={pathname === "/liked"}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: pathname === "/liked" ? 'Oswald-Bold' : 'Oswald-Light',
            fontWeight: 300,
            color: pathname === "/liked" ? '#EB1E25' : '#484646'
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <BottomTabProfileItem source="https://placebeard.it/250/250"/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: pathname === "/profile" ? 'Oswald-Bold' : 'Oswald-Light',
            fontWeight: 300,
            color: pathname === "/profile" ? '#EB1E25' : '#484646'
          },
        }}
      />
    </Tabs>
  );
}
