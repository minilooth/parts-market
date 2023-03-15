import {useTheme} from '@mui/material';

export const useDialogDisappearDuration = (): number => {
  const theme = useTheme();
  return theme.transitions.duration.leavingScreen;
}