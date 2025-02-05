import * as SecureStore from "expo-secure-store";

const isWeb = typeof window !== "undefined";

export const saveToken = async (token: string) => {
  if (isWeb) {
    localStorage.setItem("accessToken", token);
  } else {
    await SecureStore.setItemAsync("accessToken", token);
  }
};

export const getToken = async () => {
  if (isWeb) {
    return localStorage.getItem("accessToken");
  } else {
    return await SecureStore.getItemAsync("accessToken");
  }
};

export const removeToken = async () => {
  if (isWeb) {
    localStorage.removeItem("accessToken");
  } else {
    await SecureStore.deleteItemAsync("accessToken");
  }
};
