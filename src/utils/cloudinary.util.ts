import axios from 'axios';

const DEFAULT_COVER_IMAGE = import.meta.env
  .VITE_DEFAULT_DEPARTMENT_COVER_IMAGE_URL;

export const uploadImageToCloud = async (
  file: File | null
): Promise<string> => {
  if (!file) return DEFAULT_COVER_IMAGE;

  const CLOUD_NAME = 's8lzx0yk';
  const UPLOAD_PRESET = 'department_uploads';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'departments/cover_images');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error("Failed to upload department's cover image.");
  }
};
