import {useTheme} from '@mui/material';

export const useDialogDelay = (): number => {
  const theme = useTheme();
  return theme.transitions.duration.leavingScreen;
}