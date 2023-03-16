import React from 'react';

import {
  GridCallbackDetails,
  GridRowId,
  GridPaginationModel,
  GridRowSelectionModel
} from '@mui/x-data-grid';
import {toast} from 'react-toastify';
import {Stack} from '@mui/material';

import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {useMutate} from '@core/hooks/useMutate';
import {useDialogDelay} from '@core/hooks/useDialogDelay';
import {EngineTypesSWRKey} from '@core/consts/swr';
import {EngineType} from '@core/types';
import {Api} from '@core/api';
import {EngineTypesColumns} from '@core/consts/settings';
import {useEngineTypes} from '@core/hooks/entities/useEngineTypes';
import {EngineTypesTabTable} from '@components/settings/tabs/engine-type/EngineTypesTabTable';
import {EngineTypesTabForm} from '@components/settings/tabs/engine-type/EngineTypesTabForm';
import {usePagination} from '@core/hooks/usePagination';

export const EngineTypesTab: React.FC = () => {
  const mutate = useMutate();
  const dialogDelay = useDialogDelay();
  const engineTypes = useEngineTypes();

  const [page, size, paginationHandler] = usePagination();
  const [selection, setSelection] = React.useState<Array<GridRowId>>([]);

  const row = engineTypes.find(({id}) => id === selection[0])


  const handlePaginationChange = async (pagination: GridPaginationModel, callback: GridCallbackDetails) => {
    resetSelection();
    await paginationHandler(pagination, callback);
  }

  const handleRefreshClick = async (_: React.MouseEvent) => refresh();
  const handleRowSelectionChange = (selection: GridRowSelectionModel, _: GridCallbackDetails) =>
    resetSelection(selection)
  const handleUnselectClick = (_: React.MouseEvent) => resetSelection();
  const resetSelection = (value: Array<GridRowId> = []) => setSelection(value);

  const refresh = async () => {
    resetSelection();
    await mutate(EngineTypesSWRKey);
  }

  const handleSaveClick = async (engineType: EngineType, callback: VoidFunction) => {
    try {
      if (row) {
        await Api().engineType.updateById(row.id, engineType);
        await callback();
        await refresh();
        toast.success('Engine type successfully updated');
      } else {
        await Api().engineType.create(engineType);
        await callback();
        await refresh();
        toast.success('Engine type successfully saved')
      }
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const handleDeleteClick = async (engineType: EngineType, callback: VoidFunction) => {
    try {
      await Api().engineType.deleteById(engineType.id);
      await callback();
      setTimeout(async () => await refresh(), dialogDelay)
      toast.success('Engine type successfully deleted')
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <SettingsTab title="Engine Types">
      <Stack direction="row" flex={1} spacing={3}>
        <EngineTypesTabTable
          selection={row}
          rows={engineTypes}
          columns={EngineTypesColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selection}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationModelChange={handlePaginationChange}
          onRowSelectionModelChange={handleRowSelectionChange}
        />
        <EngineTypesTabForm
          selection={row}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}