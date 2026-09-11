import type { ReactElement } from 'react';
import type { RouteObject } from 'react-router-dom';

export interface Route extends Omit<RouteObject, 'children'> {
  label?: string;
  icon?: ReactElement;
  children?: Route[];
}
