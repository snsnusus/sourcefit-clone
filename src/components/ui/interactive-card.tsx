import { styled } from '@mui/material/styles';
import { Card as MuiCard, type CardProps } from '@mui/material';

export const InteractiveCard = styled(MuiCard)<CardProps>(({ theme }) => ({
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  width: '100%', // Force it to fill exactly the width of the Grid column
  minWidth: 0, // Allow it to shrink safely on smaller screens
  boxSizing: 'border-box',
  cursor: 'pointer',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],

    // 🎯 Subtle underline effect on the link text when the card is hovered
    '& .view-details-text': {
      textDecoration: 'underline',
    },
  },
}));
