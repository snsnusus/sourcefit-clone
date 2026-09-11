import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';

import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionProps extends PropsWithChildren {
  title: string | ReactNode;
}

export const Accordion = ({
  title,
  children,
}: AccordionProps): ReactElement => {
  const [open, toggle] = useState<boolean>(true);

  const handleChange = (): void => {
    toggle((prevState) => !prevState);
  };

  return (
    <MuiAccordion expanded={open} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {title}
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, px: 2, pb: 1 }}>
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
};
