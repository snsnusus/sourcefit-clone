import { SvgIconProps } from '@mui/material';
import { ElementType } from 'react';

export interface MenuItems {
  label: string;
  path?: string;
  icon?: ElementType<SvgIconProps>;
  children?: Omit<MenuItems, 'children'>[];
}
