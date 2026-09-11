export interface Email {
  email: string;
  type: string;
  tag?: string;
  isPrimary: boolean; // Indicates if this is the primary email address
  isVerified: boolean;
  verifiedAt: Date | null; // Nullable until verified successfully
}
