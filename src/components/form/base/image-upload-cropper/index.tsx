import type { Point, Area } from 'react-easy-crop/types';

import type { ChangeEvent, ReactElement } from 'react';
import { useState, useRef } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import CropperDialog from './cropper-dialog';
import HiddenInput from './hidden-input';
import ImagePreview from './image-preview';
import { createImage, base64ToFile } from './utils';

interface UploadedFile {
  fileName: string;
  fileType: string;
  imageSource: string | null;
}

interface ImageUploadCropperProps {
  name: string;
  label: string;
  value?: File | null;
}

const ImageUploadCropper = ({
  name,
  label,
}: ImageUploadCropperProps): ReactElement => {
  const [isCropperDialogOpen, setOpenCropperDialog] = useState(false);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile>({
    fileName: '',
    fileType: '',
    imageSource: null,
  });
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null); // Pixel data of the cropped area

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleHiddenInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        fileName: file.name,
        fileType: file.type,
        imageSource: URL.createObjectURL(file),
      });
      setOpenCropperDialog(true);
    }
  };

  const handleCropComplete = (areaPixels: Area): void => {
    setCroppedAreaPixels(areaPixels);
  };

  const reset = (): void => {
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setUploadedFile({
      fileName: '',
      fileType: '',
      imageSource: null,
    });
    setOpenCropperDialog(false);
  };

  const handleCrop = async (): Promise<File | null> => {
    if (croppedAreaPixels && uploadedFile.imageSource) {
      const createdImage = await createImage(uploadedFile.imageSource);
      const file = await base64ToFile(
        createdImage,
        croppedAreaPixels,
        uploadedFile.fileName,
        uploadedFile.fileType
      );

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      reset();
      setCroppedImage(file);

      return file;
    }

    return null;
  };

  const handleClose = (): void => {
    setUploadedFile({
      fileName: '',
      fileType: '',
      imageSource: null,
    });
    setOpenCropperDialog(false);
  };

  return (
    <>
      <Stack gap={1}>
        <Typography variant="body2" color="textSecondary">
          {label ?? ''}
        </Typography>
        <Stack gap={1} justifyContent="center" alignItems="center">
          <ImagePreview uploadedFile={croppedImage} />
          <Button component="label" startIcon={<FileUploadIcon />}>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
              }}
            >
              {croppedImage ? croppedImage.name : 'Browse...'}
            </Typography>
            <HiddenInput
              ref={fileInputRef}
              type="file"
              name={name}
              onChange={handleHiddenInputChange}
            />
          </Button>
        </Stack>
      </Stack>

      <CropperDialog
        open={isCropperDialogOpen}
        crop={crop}
        zoom={zoom}
        imageSource={uploadedFile.imageSource}
        setCrop={setCrop}
        setZoom={setZoom}
        onClose={handleClose}
        onCrop={handleCrop}
        onCropcomplete={handleCropComplete}
      />
    </>
  );
};

export default ImageUploadCropper;
