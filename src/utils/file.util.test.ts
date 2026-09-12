import { describe, expect, it } from 'vitest';
import { validateFile } from './file.util';

describe('validateFile', () => {
  it('is valid when file is null, regardless of config', () => {
    const result = validateFile(null, {
      acceptedFormats: ['image/png'],
      maxFileSize: { bytes: 100 },
    });

    expect(result).toEqual({
      isValid: true,
      isFormatValid: true,
      isSizeValid: true,
    });
  });

  it('is valid when no acceptedFormats or maxFileSize are configured', () => {
    const file = new File([''], 'test.png');
    const result = validateFile(file, {});

    expect(result).toEqual({
      isValid: true,
      isFormatValid: true,
      isSizeValid: true,
    });
  });

  describe('format validation — JPEG', () => {
    it('accepts a file whose MIME type exactly matches an accepted format', () => {
      const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
      const result = validateFile(file, { acceptedFormats: ['image/jpeg'] });

      expect(result.isFormatValid).toBe(true);
    });

    it('accepts a JPG file via filename when its MIME type is missing', () => {
      const file = new File([''], 'photo.jpg', { type: '' });
      const result = validateFile(file, { acceptedFormats: ['image/jpeg'] });

      expect(result.isFormatValid).toBe(true);
    });

    it('rejects a file whose MIME type does not match an accepted format', () => {
      const file = new File([''], 'document.pdf', { type: 'application/pdf' });
      const result = validateFile(file, { acceptedFormats: ['image/jpeg'] });

      expect(result.isFormatValid).toBe(false);
    });
  });

  describe('format validation — standard MIME match', () => {
    it('accepts a PNG file whose MIME type exactly matches an accepted format', () => {
      const file = new File([''], 'logo.png', { type: 'image/png' });
      const result = validateFile(file, { acceptedFormats: ['image/png'] });

      expect(result.isFormatValid).toBe(true);
    });
  });

  describe('format validation — bare extension fallback', () => {
    it('accepts a PDF file via filename when acceptedFormats has no slash', () => {
      const file = new File([''], 'document.pdf', { type: '' });
      const result = validateFile(file, { acceptedFormats: ['pdf'] });

      expect(result.isFormatValid).toBe(true);
    });
  });

  describe('size validation', () => {
    it('is valid when the file is under the size limit', () => {
      const file = new File([new Uint8Array(1000)], 'photo.png', {
        type: 'image/png',
      });
      const result = validateFile(file, { maxFileSize: { bytes: 5000 } });

      expect(result.isSizeValid).toBe(true);
    });

    it('is valid when the file size is equal to the limit', () => {
      const file = new File([new Uint8Array(5000)], 'photo.png', {
        type: 'image/png',
      });
      const result = validateFile(file, { maxFileSize: { bytes: 5000 } });

      expect(result.isSizeValid).toBe(true);
    });

    it('is invalid when the file size is over the size limit', () => {
      const file = new File([new Uint8Array(5001)], 'photo.png', {
        type: 'image/png',
      });
      const result = validateFile(file, { maxFileSize: { bytes: 5000 } });

      expect(result.isSizeValid).toBe(false);
    });
  });

  describe('combined isValid result', () => {
    it('is invalid when the file format matches but the size is over the limit', () => {
      const file = new File([new Uint8Array(10000)], 'photo.jpg', {
        type: 'image/jpeg',
      });
      const result = validateFile(file, {
        acceptedFormats: ['image/jpeg'],
        maxFileSize: { bytes: 5000 },
      });

      expect(result).toEqual({
        isValid: false,
        isFormatValid: true,
        isSizeValid: false,
      });
    });

    it('is invalid when the format is not accepted but the size is within the limit', () => {
      const file = new File([new Uint8Array(100)], 'document.pdf', {
        type: 'application/pdf',
      });
      const result = validateFile(file, {
        acceptedFormats: ['image/png'],
        maxFileSize: { bytes: 5000 },
      });

      expect(result).toEqual({
        isValid: false,
        isFormatValid: false,
        isSizeValid: true,
      });
    });
  });
});
