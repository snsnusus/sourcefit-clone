import type { Point, Area } from 'react-easy-crop/types';

import type { ReactElement } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Cropper from 'react-easy-crop';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

interface CropperDialogProps {
  open: boolean;
  crop: Point;
  zoom: number;
  imageSource: string | null;
  setCrop: (point: Point) => void;
  setZoom: (value: number) => void;
  onClose: () => void;
  onCrop: () => void;
  onCropcomplete: (areaPixels: Area) => void;
}

const CropperDialog = ({
  open,
  crop,
  zoom,
  imageSource,
  setCrop,
  setZoom,
  onClose,
  onCrop,
  onCropcomplete,
}: CropperDialogProps): ReactElement => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogContent sx={{ paddingBottom: 2, overflow: 'hidden' }}>
      <Stack gap={2}>
        <Stack sx={{ position: 'relative', width: '100%', height: '300px' }}>
          <Cropper
            image={imageSource ?? ''}
            crop={crop}
            zoom={zoom}
            aspect={3 / 3}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, areaPixels) => onCropcomplete(areaPixels)}
          />
        </Stack>
        <Stack spacing={2.5} direction="row" sx={{ alignItems: 'center' }}>
          <ZoomOutIcon />
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, value) => setZoom(value as number)}
          />
          <ZoomInIcon />
        </Stack>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="contained" onClick={onCrop}>
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default CropperDialog;
