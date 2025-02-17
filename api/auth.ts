import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constants"

const sendOTP = async ({
  phone,
  countryCode,
}: {
  phone: string;
  countryCode: string;
}) => {
  const response = await fetch(
    "https://sandbox.ignitecove.com/v1/account/otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, countryCode }),
    }
  );

  if (!response.ok) {
    console.log("Error: ", response)
    throw new Error("Failed to send OTP");

  }

  return response.json();
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: sendOTP,
  });
};

const verifyOTP = async ({ otp, phone, countryCode }: { otp: string; phone: string; countryCode: string }) => {
    const response = await fetch(`${API_BASE_URL}/account/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, phone, countryCode }),
    });

    console.log("Verify OTP Response: ", response)
  
    if (!response.ok) {
      throw new Error("Invalid OTP or network issue");
    }
  
    return response.json();
  };
  
  export const useVerifyOTP = () => {
    return useMutation({
      mutationFn: verifyOTP,
    });
  };
