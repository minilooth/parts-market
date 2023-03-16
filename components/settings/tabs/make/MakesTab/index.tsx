import React from 'react';
import {GridCallbackDetails, GridRowId, GridRowSelectionModel, GridPaginationModel} from '@mui/x-data-grid';
import {Stack} from '@mui/material';
import {toast} from 'react-toastify';

import {MakesColumns} from '@core/consts/settings';
import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {MakesTabForm} from '@components/settings/tabs/make/MakesTabForm';
import {MakesTabTable} from '@components/settings/tabs/make/MakesTabTable';
import {useMakes} from '@core/hooks/entities/useMakes';
import {Make} from '@core/types';
import {MakesSWRKey} from '@core/consts/swr';
import {useMutate} from '@core/hooks/useMutate';
import {Api} from '@core/api';
import {useDialogDelay} from '@core/hooks/useDialogDelay';
import {usePagination} from '@core/hooks/usePagination';

export const MakesTab: React.FC = () => {
  const makes = useMakes();
  const mutate = useMutate();
  const dialogDelay = useDialogDelay();

  const [page, size, paginationHandler] = usePagination();
  const [selection, setSelection] = React.useState<Array<GridRowId>>([]);

  const row = makes.find(({id}) => id === selection[0])

  const handlePaginationChange = async (pagination: GridPaginationModel, callback: GridCallbackDetails) => {
    resetSelection();
    await paginationHandler(pagination, callback);
  }

  const handleRefreshClick = async (_: React.MouseEvent) => await refresh();
  const handleRowSelectionChange = (selection: GridRowSelectionModel, _: GridCallbackDetails) =>
    resetSelection(selection)
  const handleUnselectClick = (_: React.MouseEvent) => resetSelection();
  const resetSelection = (value: Array<GridRowId> = []) => setSelection(value);

  const refresh = async () => {
    resetSelection();
    await mutate(MakesSWRKey);
  }

  const handleSaveClick = async (make: Make, callback: VoidFunction) => {
    try {
      if (row) {
        await Api().make.updateById(row.id, make);
        await callback();
        await refresh();
        toast.success('Make successfully updated');
      } else {
        await Api().make.create(make);
        await callback();
        await refresh();
        toast.success('Make successfully saved')
      }
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const handleDeleteClick = async (make: Make, callback: VoidFunction) => {
    try {
      await Api().make.deleteById(make.id);
      await callback();
      setTimeout(async () => await refresh(), dialogDelay)
      toast.success('Make successfully deleted')
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <SettingsTab title="Makes">
      <Stack direction="row" flex={1} spacing={3}>
        <MakesTabTable
          selection={row}
          rows={makes}
          columns={MakesColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selection}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationModelChange={handlePaginationChange}
          onRowSelectionModelChange={handleRowSelectionChange}
        />
        <MakesTabForm
          selection={row}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}