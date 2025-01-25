import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Stack, Link } from 'expo-router';

const CreateAccount = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      <View>
      <Text>create-account</Text>
      <Link href="/payment">
          Navigate to Payment Screen
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default CreateAccount

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  })