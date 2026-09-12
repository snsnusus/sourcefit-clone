import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CloseIcon from '@mui/icons-material/Close';

export interface AlertDialogProps {
  open: boolean;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  title = 'Reassign User Department?',
  description,
  confirmText = 'Yes, Continue',
  cancelText = 'Cancel',
  loading = false,
  onClose,
  onConfirm,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    fullWidth
    slotProps={{
      paper: {
        sx: {
          borderRadius: 3,
          p: 2,
          textAlign: 'center',
          position: 'relative',
        },
      },
    }}
  >
    <IconButton
      onClick={onClose}
      disabled={loading}
      sx={{
        position: 'absolute',
        right: 12,
        top: 12,
        color: 'text.secondary',
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>

    <DialogContent sx={{ pt: 2, pb: 1, px: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'warning.light',
            width: 75,
            height: 75,
          }}
        >
          <WarningRoundedIcon sx={{ fontSize: 45 }} />
        </Avatar>
      </Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.5 }}
      >
        {description}
      </Typography>
    </DialogContent>

    <DialogActions sx={{ justifyContent: 'center', gap: 1, pt: 2, px: 2 }}>
      <Button
        variant="text"
        color="inherit"
        onClick={onClose}
        disabled={loading}
        sx={{
          minWidth: 120,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        {cancelText}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onConfirm}
        disabled={loading}
        sx={{
          minWidth: 120,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        }}
      >
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);
