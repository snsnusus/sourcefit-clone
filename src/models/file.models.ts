export interface FileValidationConfig {
  maxFileSize?: {
    bytes: number;
    formattedLabel?: string;
  };
  acceptedFormats?: string[];
}
