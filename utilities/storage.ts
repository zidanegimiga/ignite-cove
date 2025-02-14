import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = typeof window !== "undefined";

/**
 * Save token securely based on platform
 */
export const saveToken = async (token: string) => {
  try {
    if (isWeb) {
      await AsyncStorage.setItem("accessToken", token); // Works on Web
    } else {
      await SecureStore.setItemAsync("accessToken", token); // Works on Mobile
    }
  } catch (error) {
    console.error("❌ Error saving token:", error);
  }
};

/**
 * Retrieve token securely based on platform
 */
export const getToken = async () => {
  try {
    if (isWeb) {
      return await AsyncStorage.getItem("accessToken");
    } else {
      return await SecureStore.getItemAsync("accessToken");
    }
  } catch (error) {
    console.error("❌ Error retrieving token:", error);
    return null;
  }
};

/**
 * Remove token securely based on platform
 */
export const removeToken = async () => {
  try {
    if (isWeb) {
      await AsyncStorage.removeItem("accessToken");
    } else {
      await SecureStore.deleteItemAsync("accessToken");
    }
  } catch (error) {
    console.error("❌ Error removing token:", error);
  }
};
