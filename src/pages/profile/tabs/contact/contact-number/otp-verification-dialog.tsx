import { useState, useEffect, type ReactElement, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Alert,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface OtpVerificationDialogProps {
  open: boolean;
  onClose: () => void;
  phoneNumber: string;
  expiresAt: number | null;
  onVerifySuccess: () => void;
  externalError: string;
  setExternalError: (val: string) => void;
  onResend: () => Promise<void>;
}

const OtpVerificationDialog = ({
  open,
  onClose,
  phoneNumber,
  expiresAt,
  onVerifySuccess,
  externalError,
  setExternalError,
  onResend,
}: OtpVerificationDialogProps): ReactElement => {
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [otpArray, setOtpArray] = useState<string[]>(new Array(6).fill(''));
  const [internalError, setInternalError] = useState<string>('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setOtpCode(otpArray.join(''));
  }, [otpArray]);

  useEffect(() => {
    if (open) {
      setOtpArray(new Array(6).fill(''));
      setError('');
      setOtpCode('');
      setInternalError('');

      if (expiresAt) {
        const remainingSeconds = Math.max(
          0,
          Math.floor((expiresAt - Date.now()) / 1000)
        );
        setTimer(remainingSeconds); // This will correctly evaluate to roughly 60 seconds!
      } else {
        setTimer(180); // Default fallback if expiresAt is missing
      }

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 50);
    }
  }, [open, expiresAt]);

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setTimeout(() => {
            setInternalError('');
            setExternalError('');
          }, 0);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, setExternalError]);

  const handleOtpInputChange = (value: string, index: number): void => {
    const sanitizedValue = value.replace(/\D/g, '');
    if (!sanitizedValue) return;

    if (externalError) setExternalError('');
    if (internalError) setInternalError('');

    const newOtpArray = [...otpArray];
    const targetChar = sanitizedValue.substring(sanitizedValue.length - 1);
    newOtpArray[index] = targetChar;
    setOtpArray(newOtpArray);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === 'Backspace') {
      const newOtpArray = [...otpArray];

      if (otpArray[index] !== '') {
        newOtpArray[index] = '';
        setOtpArray(newOtpArray);
      } else if (index > 0) {
        newOtpArray[index - 1] = '';
        setOtpArray(newOtpArray);
        inputRefs.current[index - 1]?.focus();
      }
      e.preventDefault();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .substring(0, 6);

    if (pastedData.length === 6) {
      const splitData = pastedData.split('');
      setOtpArray(splitData);
      inputRefs.current[5]?.focus();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerifySubmit = async (): Promise<void> => {
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setLoading(true);
    setError('');

    onVerifySuccess();
  };

  const activeError = internalError || externalError;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center', fontWeight: 'bold' }}>
        Security Verification
        {!loading && (
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {activeError && (
          <Alert variant="filled" severity="warning">
            <Typography variant="body2">{activeError}</Typography>
          </Alert>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            We sent a verification code to <strong>{phoneNumber}</strong>.
            <br />
            Please enter it below to authorize operation.
          </Typography>
          <Box
            onPaste={handleOtpPaste}
            sx={{
              display: 'flex',
              gap: 1.5,
              justifyContent: 'center',
              mb: 3,
              mt: 1,
            }}
          >
            {otpArray.map((digit, index) => (
              <TextField
                key={index}
                value={digit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOtpInputChange(e.target.value, index)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (
                    e.key === 'Enter' &&
                    otpCode.length === 6 &&
                    !loading &&
                    timer > 0
                  ) {
                    handleVerifySubmit();
                  } else {
                    handleOtpKeyDown(e, index);
                  }
                }}
                inputRef={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
                disabled={loading || timer === 0}
                error={!!error}
                variant="outlined"
                autoComplete="one-time-code"
                slotProps={{
                  htmlInput: {
                    maxLength: 1,
                    type: 'text',
                    inputMode: 'numeric',
                    style: {
                      textAlign: 'center',
                      fontSize: '22px',
                      fontWeight: 'bold',
                      padding: '12px 0px',
                    },
                  },
                }}
                sx={{
                  width: '45px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            ))}
          </Box>

          <Box sx={{ mt: 1, textAlign: 'center' }}>
            {timer > 0 ? (
              <Typography variant="caption" color="text.secondary">
                Code expires in: {formatTime(timer)}
              </Typography>
            ) : (
              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" color="error.main">
                  Code has expired.
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  disabled={loading} // 🛡️ Prevent double-tap layout shifts
                  onClick={async () => {
                    setLoading(true);
                    setError('');
                    setInternalError('');

                    await onResend();

                    setLoading(false);
                  }}
                  sx={{
                    textTransform: 'none',
                    padding: 0,
                    minWidth: 'auto',
                    fontSize: '0.75rem', // Matches Caption Typography scale perfectly
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Resend Code
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
        <Button
          onClick={handleVerifySubmit}
          variant="contained"
          color="primary"
          disabled={loading || otpCode.length !== 6 || timer === 0}
          fullWidth
          sx={{ py: 1.2, fontWeight: 'bold' }}
        >
          {loading ? 'Verifying Code...' : 'Submit & Verify'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OtpVerificationDialog;
