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