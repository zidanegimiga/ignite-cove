import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { ScreenContainer } from 'react-native-screens';
import ProfileHeader from '@/components/features/Profile/ProfileHeader';

export default function Profile() {
  const [loaded, error] = useFonts({
    'Oswald-Bold': require("@/assets/fonts/oswald/Oswald-Bold.ttf"),
    'Oswald-Regular': require("@/assets/fonts/oswald/Oswald-Regular.ttf"),
  })
  return (
    <SafeAreaView style={styles.screenContainer}>
        <ThemedText style={styles.title}>Profile</ThemedText>
        <ProfileHeader name='Mary' age='31' image_url=''/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontFamily: 'Oswald-Regular',
    fontSize: 16,
    marginBottom: 16
  }
});