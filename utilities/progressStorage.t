import AsyncStorage from "@react-native-async-storage/async-storage";

const PROGRESS_KEY = "userProgress";

/**
 * Save user progress in AsyncStorage
 * @param {string} stage - The current stage (e.g., "onboarding", "otp_verified", "payment_completed")
 */
export const saveUserProgress = async (stage: string) => {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, stage);
  } catch (error) {
    console.error("❌ Failed to save user progress:", error);
  }
};

/**
 * Get user progress from AsyncStorage
 * @returns {Promise<string | null>} - The last saved stage or null if not found
 */
export const getUserProgress = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(PROGRESS_KEY);
  } catch (error) {
    console.error("❌ Failed to retrieve user progress:", error);
    return null;
  }
};

/**
 * Clear user progress (e.g., on logout)
 */
export const clearUserProgress = async () => {
  try {
    await AsyncStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.error("❌ Failed to clear user progress:", error);
  }
};
