import type { SvgIconProps } from '@mui/material';
import type { ElementType } from 'react';

export interface MenuItems {
  label: string;
  path?: string;
  icon?: ElementType<SvgIconProps>;
  children?: Omit<MenuItems, 'children'>[];
}
