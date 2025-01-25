import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import React from "react";

/**
 * A suggested approach would be creating different components that compose of the different steps
 * and then use a state machine to manage the state of the component
 *
 * The state could be stored in async storage to determine where the user reached, also save their progress their.
 * Profile data could be temporarily stored in a SQLlite DB
 *
 * @returns Profile Setup Screen
 */
const ProfileSetup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Profile Setup First Screen</Text>

        <Link href="/(screen-home)">Navigate home</Link>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
