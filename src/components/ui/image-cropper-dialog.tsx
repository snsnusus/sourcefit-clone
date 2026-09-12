import { useEffect, useMemo, useState, type ReactElement } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slider,
  Stack,
} from '@mui/material';
import Cropper, { type Point, type Area } from 'react-easy-crop';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

export interface ImageCropperDialogProps {
  open: boolean;
  onClose: () => void;
  file: File | null;
  onCropcomplete: (croppedImage: File) => void;
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });

export const base64ToFile = async (
  image: HTMLImageElement,
  pixelCrop: Area,
  filename = 'cropped-image.jpg',
  mimeType = 'image/jpeg'
): Promise<File> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas not supported');

  // Set the canvas size to the cropped area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the image onto the canvas based on the cropped area
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Convert the canvas to base64 string with the specified mimeType
  const dataUrl = canvas.toDataURL(mimeType, 1.0); // You can adjust the quality (0.8 here for JPEG)

  // Convert the base64 string to a Blob
  const byteString = window.atob(dataUrl.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Copy the byteString to the Uint8Array
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the byte array
  const blob = new Blob([uint8Array], { type: mimeType });

  // Return a File object from the Blob
  return new File([blob], filename, { type: mimeType });
};

const ImageCropperDialog = ({
  open,
  onClose,
  file,
  onCropcomplete,
}: ImageCropperDialogProps): ReactElement => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const imageSource = useMemo(() => {
    if (!file) return null;
    return {
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    };
  }, [file]);

  useEffect(
    () => () => {
      if (imageSource) {
        URL.revokeObjectURL(imageSource.url);
      }
    },
    [imageSource]
  );

  const handleCrop = (areaPixels: Area): void => {
    setCroppedAreaPixels(areaPixels);
  };

  const handleCropComplete = async (): Promise<null | undefined> => {
    if (croppedAreaPixels && file) {
      const createdImage = await createImage(imageSource?.url ?? '');
      const croppedImageFile = await base64ToFile(
        createdImage,
        croppedAreaPixels,
        file.name,
        file.type
      );

      setCroppedAreaPixels(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);

      onCropcomplete(croppedImageFile);

      onClose();

      return;
    }

    return null;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableRestoreFocus
    >
      <DialogContent sx={{ paddingBottom: 2, overflow: 'hidden' }} dividers>
        <Stack
          sx={{
            gap: 2,
          }}
        >
          <Stack sx={{ position: 'relative', width: '100%', height: '500px' }}>
            <Cropper
              image={imageSource?.url ?? ''}
              crop={crop}
              zoom={zoom}
              aspect={3 / 3}
              cropShape="round"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, areaPixels) => handleCrop(areaPixels)}
            />
          </Stack>
          <Stack spacing={2.5} direction="row" sx={{ alignItems: 'center' }}>
            <ZoomOutIcon fontSize="medium" />
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(_, value) => setZoom(value as number)}
            />
            <ZoomInIcon fontSize="medium" />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCropComplete}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ImageCropperDialog;
