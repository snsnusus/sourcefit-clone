import type { ReactElement } from 'react';

import { useFormContext } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { blue, pink, orange } from '@mui/material/colors';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import MoodIcon from '@mui/icons-material/Mood';

interface ImagePreviewProps {
  uploadedFile: File | null;
}

const ImagePreview = ({ uploadedFile }: ImagePreviewProps): ReactElement => {
  const { watch } = useFormContext();

  const firstname = watch('firstname');
  const lastname = watch('lastname');
  const gender = watch('gender');

  const isNameComplete = !!(firstname && lastname);

  const AvatarIcon = gender === 'male' ? FaceIcon : Face3Icon;

  return (
    <>
      {uploadedFile ? (
        <Stack alignItems="center" gap={1}>
          <Tooltip title={uploadedFile.name} placement="right">
            <Avatar
              src={URL.createObjectURL(uploadedFile)}
              sx={{ width: 125, height: 125, objectFit: 'contain' }}
            />
          </Tooltip>
        </Stack>
      ) : (
        <Avatar
          sx={{
            width: 125,
            height: 125,
            objectFit: 'contain',
            bgcolor: gender
              ? gender === 'male'
                ? blue[500]
                : pink[500]
              : orange[500],
          }}
        >
          {isNameComplete ? (
            <Typography variant="h3">
              {firstname?.[0]?.toUpperCase() ?? ''}
              {lastname?.[0]?.toUpperCase() ?? ''}
            </Typography>
          ) : gender ? (
            <AvatarIcon sx={{ fontSize: '5rem' }} />
          ) : (
            <MoodIcon sx={{ fontSize: '5rem' }} />
          )}
        </Avatar>
      )}
    </>
  );
};

export default ImagePreview;
