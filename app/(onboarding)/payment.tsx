import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import React from "react";

const PaymentScreen = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      <View>
        <Text>Payment Screen</Text>
        <Link href="/(profile-setup)">
          <Text>Go to Profile Setup</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
