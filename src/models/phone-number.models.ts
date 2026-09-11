export type PhoneNumber = {
  id: string;
  countryCode: string;
  dialCode: string;
  international: string; // "+639361231234" -> The payload you pass to Semaphore/OTP APIs
  local: string; // "09361231234" -> Standard format for local lookups/logging
  formatted: string; // "(+63) 936 123 1234" -> Exactly what gets rendered in the UI
  isVerified: boolean;
  verifiedAt: Date | null; // Nullable until verified successfully
  isPrimary: boolean; // Indicates if this is the primary contact number
};
