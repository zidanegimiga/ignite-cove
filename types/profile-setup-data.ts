export interface UserProfile {
    personality?: string;
    firstName?: string;
    lastName?: string;
    DOB?: string;
    age?: number;
    gender?: string;
    sexualOrientation?: string[];
    location?: { longitude: number; latitude: number };
    stringLocation?: string | null | undefined;
    physicalAttributes?: {
      height: string | number | null;
      metric: string;
      bodyType: string | null;
      eyeColor: string | null;
      hairColor: string | null;
    };
    lifestyle?: {
      fitness: string | null;
      diet: string | null;
      smoking: string | null;
      drinking: string | null;
      pets: string | null;
    };
    socioEconomic?: {
      languages: string[] | null;
      ethnicity: string | null;
      religion: string | null;
      educationLevel: string | null;
      occupation: string | null;
      industry: string | null;
    };
    photos?: string[];
    skippedSteps?: number[];
    profile_photo: string | null;
}

export type Steps = "enter_number" | "otp_verification" | "personality" | "name" |"dob" |"gender" | "orientation" |"location" | "physical_attributes" | "socio-economic" | "photo" | "plan_selection" | "payment_method_selection" | "payment_done" | "phone_verified" | "lifestyle";

export const stepMappings: Record<number, string> = {
  0: "personality",
  1: "name",
  2: "dob",
  3: "gender",
  4: "orientation",
  5: "location",
  6: "physical_attributes",
  7: "lifestyle",
  8: "socio-economic",
  9: "photo",
  10: "loading",
  11: "profile_ready",
};