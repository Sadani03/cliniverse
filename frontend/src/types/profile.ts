export type BiologicalSex =
  | "Female"
  | "Male"
  | "Prefer not to say"
  | "";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-"
  | "Unknown"
  | "";

export type ExerciseFrequency =
  | "Never"
  | "1–2 times per week"
  | "3–4 times per week"
  | "5 or more times per week"
  | "";

export type SmokingStatus =
  | "No"
  | "Occasionally"
  | "Yes"
  | "Prefer not to say"
  | "";

export type AlcoholUse =
  | "No"
  | "Occasionally"
  | "Regularly"
  | "Prefer not to say"
  | "";

export type ResponseStyle =
  | "Concise"
  | "Balanced"
  | "Detailed";

export type ThemePreference =
  | "System"
  | "Light"
  | "Dark";

export type HealthProfile = {
  personal: {
    fullName: string;
    dateOfBirth: string;
    biologicalSex: BiologicalSex;
    heightCm: string;
    weightKg: string;
    bloodGroup: BloodGroup;
  };

  health: {
    allergies: string;
    chronicConditions: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };

  lifestyle: {
    averageSleepHours: string;
    dailyWaterGlasses: string;
    exerciseFrequency: ExerciseFrequency;
    smokingStatus: SmokingStatus;
    alcoholUse: AlcoholUse;
  };

  preferences: {
    preferredLanguage: string;
    responseStyle: ResponseStyle;
    voiceEnabled: boolean;
    notificationsEnabled: boolean;
    theme: ThemePreference;
  };
};

export const defaultHealthProfile: HealthProfile = {
  personal: {
    fullName: "",
    dateOfBirth: "",
    biologicalSex: "",
    heightCm: "",
    weightKg: "",
    bloodGroup: "",
  },

  health: {
    allergies: "",
    chronicConditions: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  },

  lifestyle: {
    averageSleepHours: "",
    dailyWaterGlasses: "",
    exerciseFrequency: "",
    smokingStatus: "",
    alcoholUse: "",
  },

  preferences: {
    preferredLanguage: "English",
    responseStyle: "Balanced",
    voiceEnabled: true,
    notificationsEnabled: true,
    theme: "System",
  },
};