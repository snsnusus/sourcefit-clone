import type { SxProps } from '@mui/material';

import { useState, type ReactElement, type ReactNode } from 'react';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TabPanel from './tab/tab-panel';

interface StepperProps {
  steps: {
    label: string;
    optional?: boolean;
    content: ReactNode;
  }[];
  completeFn: () => void;
  sx?: SxProps;
}

const ChildWrapper = styled(Stack)({
  flexGrow: 1,
  overflow: 'auto',
});

const Stepper = ({ steps, sx, completeFn }: StepperProps): ReactElement => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isOptional = (step: number): boolean => !!steps[step]?.optional;
  const isSkipped = (step: number): boolean => skipped.has(step);

  const skip = (): void => {
    if (isOptional(activeStep)) {
      setSkipped((prev) => new Set([...prev, activeStep]));
      setActiveStep((prev) => prev + 1);
    }
  };

  const next = (): void => {
    setSkipped((prev) =>
      isSkipped(activeStep)
        ? new Set([...prev].filter((s) => s !== activeStep))
        : prev
    );
    setActiveStep((prev) => prev + 1);
  };

  const complete = (): void => {
    setActiveStep(0);

    completeFn();
  };

  return (
    <Stack gap={2}>
      <MuiStepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          ...sx,
          '& .MuiStepLabel-label': {
            fontSize: '1rem',
            '&.MuiStepLabel-alternativeLabel': {
              marginTop: '12px',
            },
            '&.Mui-active': {
              fontWeight: 300,
            },
            '&.Mui-completed': {
              color: 'primary.main',
              // opacity: 0.5,
            },
          },
          '& .MuiStepIcon-root': {
            fontSize: '2rem', // Increase the step icon size
          },
          '& .MuiStepConnector-root': {
            top: '18px',
            left: 'calc(-50% + 25px)',
            right: 'calc(50% + 25px)',
          },
        }}
      >
        {steps.map(({ label, optional }, idx) => {
          const stepProps: { completed?: boolean } = {
            completed: !isSkipped(idx) && idx < activeStep,
          };
          const labelProps = optional
            ? { optional: <Typography variant="caption">Optional</Typography> }
            : {};

          return (
            <Step key={idx} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </MuiStepper>
      <ChildWrapper>
        {steps.map(({ content }, idx) => (
          <TabPanel key={idx} value={activeStep} index={idx}>
            {content}
          </TabPanel>
        ))}
      </ChildWrapper>
      {activeStep === steps.length ? (
        <Stack direction="row">
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="primary" onClick={complete}>
            Complete
          </Button>
        </Stack>
      ) : (
        <Stack direction="row">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Back
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {isOptional(activeStep) && (
            <Button color="primary" size="small" onClick={skip}>
              Skip
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={next}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Stepper;
