import { PaginationPropsColorOverrides } from '@mui/material';

declare module '@mui/material' {
  interface PaginationPropsColorOverrides {
    warning: true;
  }
}
