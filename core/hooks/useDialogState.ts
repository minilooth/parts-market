import React from 'react';

export const useDialogState = (initialValue: boolean): [boolean, VoidFunction, VoidFunction] => {
  const [opened, setOpened] = React.useState(initialValue);

  const open = () => {
    setOpened(true);
  }

  const close = () => {
    setOpened(false);
  }

  return [opened, open, close];
}