export type SymptomSeverity = "Mild" | "Moderate" | "Severe";

export type SymptomDuration =
  | "Less than 24 hours"
  | "1–3 days"
  | "4–7 days"
  | "More than one week";

export type SymptomFormData = {
  symptoms: string[];
  severity: SymptomSeverity | "";
  duration: SymptomDuration | "";
  additionalDetails: string;
};

export type SymptomResult = {
  title: string;
  summary: string;
  selfCare: string[];
  seekHelpWhen: string[];
  urgency: "Low" | "Moderate" | "Urgent";
};