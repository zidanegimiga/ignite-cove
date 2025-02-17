import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import OutlinedCheckMark from "@/components/shared/Icons/OutlinedCheckmark";
import Button from "@/components/shared/Button";
import { PlanSelectionProps } from "@/types/plans";

const PlanSelection = ({
  handleForward,
  planDetails,
  error,
  isLoading,
}: PlanSelectionProps) => {
  const [loaded] = useFonts({
    "Oswald-Regular": require("../../../assets/fonts/oswald/Oswald-Regular.ttf"),
    "Oswald-Light": require("../../../assets/fonts/oswald/Oswald-Light.ttf"),
    "Oswald-Medium": require("../../../assets/fonts/oswald/Oswald-Medium.ttf"),
  });

  useEffect(() => {
    console.log("The Plans details: ", { planDetails, error, isLoading });
  }, [planDetails, error, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FA623B" />
        <ThemedText style={styles.message}>Loading plans...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.errorMessage}>
          Failed to load plans. Please try again.
        </ThemedText>
      </View>
    );
  }

  if (!planDetails || planDetails.length === 0) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.errorMessage}>
          ⚠️ No plans available at the moment.
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={planDetails}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.planContainer}>
          <ThemedText style={styles.planTitle}>{item.name}</ThemedText>
          <ThemedText style={styles.planPrice}>
            {item.planDetails[0]?.currency}{" "}
            {item.planDetails[0]?.price.toFixed(2)}
          </ThemedText>

          <View style={styles.divider}></View>

          <View style={styles.benefitRow}>
            <OutlinedCheckMark />
            <ThemedText style={styles.benefitText}>
              You get {item.slots} phone numbers
            </ThemedText>
          </View>

          <Button title="Choose Plan" onPress={handleForward} />
        </View>
      )}
    />
  );
};

export default PlanSelection;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    height: 200,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "Oswald-Regular",
    fontSize: 14,
    color: "#484646",
  },
  errorMessage: {
    fontFamily: "Oswald-Regular",
    fontSize: 14,
    color: "#EB1E25",
    textAlign: "center",
  },
  planContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    height: 200,
    marginTop: 16,
  },
  planTitle: {
    fontFamily: "Oswald-Medium",
    fontSize: 14,
    lineHeight: 24,
    color: "#0F0D13",
  },
  planPrice: {
    fontFamily: "Oswald-Medium",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 4,
    color: "#0F0D13",
  },
  divider: {
    width: "100%",
    borderTopColor: "#CBD5E1",
    borderTopWidth: 1,
    marginVertical: 8,
    borderStyle: "solid",
  },
  benefitRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 16,
    gap: 4,
  },
  benefitText: {
    fontFamily: "Oswald-Light",
    fontSize: 12,
    lineHeight: 24,
    marginBottom: 4,
    color: "#484646",
  },
});
