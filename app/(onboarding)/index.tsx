import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native'
import { Stack, Link } from 'expo-router';
import React from 'react'

const OnboardingHome = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      <View >
        <Text>Onboarding Home</Text>
        <Link href="/create-account">
          Navigate to Account creation
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default OnboardingHome

const styles = StyleSheet.create({
mainView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
})