import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "@/types/profile-setup-data";
import { Steps } from "@/types/profile-setup-data";

const PROFILE_STORAGE_KEY = "user_profile";
const PROFILE_SETUP_PROGRESS_KEY = "profile_setup_progress"



/**
 * Save profile data to AsyncStorage
 */
export const saveProfileData = async (data: Partial<UserProfile>) => {
  try {
    console.log("Saving data: ", data)
    const existingData = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
    const parsedData = existingData ? JSON.parse(existingData) : {};
    const updatedData = { ...parsedData, ...data };

    await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error saving profile data:", error);
  }
};

/**
 * Load profile data from AsyncStorage
 */
export const loadProfileData = async (): Promise<UserProfile | null> => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading profile data:", error);
    return null;
  }
};

/**
 * Save skipped steps
 */
export const saveSkippedStep = async (stepNumber: number) => {
  try {
    const data = await loadProfileData();
    const updatedData = {
      ...data,
      skippedSteps: [...(data?.skippedSteps || []), stepNumber],
    };

    await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error saving skipped step:", error);
  }
};

export const saveSetupProgress = async (step: Steps) => {
  try {
    console.log("Saving step: ", step)
    await AsyncStorage.setItem(PROFILE_SETUP_PROGRESS_KEY, step);
  } catch (error) {
    console.error("Error saving skipped step:", error);
  }
};

export const loadProgressStep = async (): Promise<Steps | null> => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_SETUP_PROGRESS_KEY);
    console.log("Found: ", data)
    if(data){
      // @ts-ignore
      return data
    } else {
      return null
    }
    // return data ? data : "enter_number";
  } catch (error) {
    console.error("Error loading profile data:", error);
    return "dob";
  }
};

export const calculateCompletion = async (): Promise<number> => {
    try {
      const data = await loadProfileData();
      if (!data) return 0;
  
      const totalSteps = 10;
      let completedSteps = 0;
  
      if (data.personality) completedSteps++;
      if (data.firstName && data.lastName) completedSteps++;
      if (data.DOB) completedSteps++;
      if (data.gender) completedSteps++;
      if (data.sexualOrientation && data.sexualOrientation.length > 0) completedSteps++;
      if (data.location) completedSteps++;
      if (data.physicalAttributes) completedSteps++;
      if (data.lifestyle) completedSteps++;
      if (data.socioEconomic) completedSteps++;
      if (data.photos && data.photos.length > 0) completedSteps++;
  
      return (completedSteps / totalSteps) * 100;
    } catch (error) {
      console.error("Error calculating completion:", error);
      return 0;
    }
  };
  
