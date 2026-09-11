import { type FileValidationConfig } from '~/models/file.models';

export const truncateFilename = (filename: string, maxLength = 25): string => {
  if (filename.length <= maxLength) return filename;

  const dotIndex = filename.lastIndexOf('.');
  const extension = dotIndex !== -1 ? filename.slice(dotIndex) : '';

  const charsToShow = maxLength - extension.length - 3;

  if (charsToShow <= 0) {
    return filename.slice(0, maxLength - 3) + '...';
  }

  const namePart = filename.slice(0, charsToShow);

  return `${namePart}...${extension}`;
};

export const validateFile = (
  file: File | null,
  config: FileValidationConfig
): { isValid: boolean; isFormatValid: boolean; isSizeValid: boolean } => {
  if (!file) return { isValid: true, isFormatValid: true, isSizeValid: true };

  const { maxFileSize, acceptedFormats } = config;
  let isFormatValid = true;
  let isSizeValid = true;

  if (acceptedFormats && acceptedFormats.length > 0) {
    isFormatValid = acceptedFormats.some((format) => {
      // 1. Clean up input variations (e.g., "image/tiff" -> "tiff", ".tif" -> "tif")
      const cleanFormat = format
        .toLowerCase()
        .trim()
        .replace('image/', '')
        .replace('.', '');

      const fileTypeLower = file.type.toLowerCase();
      const fileNameLower = file.name.toLowerCase();

      // 🟢 SMART CHECK: JPEG historical variations (.jpg vs .jpeg)
      if (
        cleanFormat === 'jpg' ||
        cleanFormat === 'jpeg' ||
        cleanFormat === 'pjpeg'
      ) {
        return (
          fileTypeLower === 'image/jpeg' ||
          fileTypeLower === 'image/pjpeg' ||
          fileNameLower.endsWith('.jpg') ||
          fileNameLower.endsWith('.jpeg')
        );
      }

      // 🟢 SMART CHECK: TIFF historical variations (.tif vs .tiff)
      if (cleanFormat === 'tif' || cleanFormat === 'tiff') {
        return (
          fileTypeLower === 'image/tiff' ||
          fileNameLower.endsWith('.tif') ||
          fileNameLower.endsWith('.tiff')
        );
      }

      // 3. STANDARD FALLBACK: Handle modern formats directly (PNG, PDF, DOCX, etc.)
      if (format.includes('/')) {
        return fileTypeLower === format.toLowerCase().trim();
      }

      return fileNameLower.endsWith(`.${cleanFormat}`);
    });
  }

  if (maxFileSize) {
    isSizeValid = file.size <= maxFileSize.bytes;
  }

  return {
    isValid: isFormatValid && isSizeValid,
    isFormatValid,
    isSizeValid,
  };
};
