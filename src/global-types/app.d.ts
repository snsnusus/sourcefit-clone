import type { ReactNode } from 'react';

declare global {
  export interface PropsWithChildren<T = object> extends T {
    children?: ReactNode;
  }
}
