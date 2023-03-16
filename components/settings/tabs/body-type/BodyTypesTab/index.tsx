import React from 'react'
import {
  GridCallbackDetails,
  GridPaginationModel,
  GridRowId,
  GridRowSelectionModel
} from '@mui/x-data-grid';
import {toast} from 'react-toastify';
import {Stack} from '@mui/material';

import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {useMutate} from '@core/hooks/useMutate';
import {useDialogDelay} from '@core/hooks/useDialogDelay';
import {BodyTypesSWRKey} from '@core/consts/swr';
import {BodyType} from '@core/types';
import {Api} from '@core/api';
import {BodyTypesColumns} from '@core/consts/settings';
import {useBodyTypes} from '@core/hooks/entities/useBodyTypes';
import {BodyTypesTabTable} from '@components/settings/tabs/body-type/BodyTypesTabTable';
import {BodyTypesTabForm} from '@components/settings/tabs/body-type/BodyTypesTabForm';
import {usePagination} from '@core/hooks/usePagination';

export const BodyTypesTab: React.FC = () => {
  const mutate = useMutate();
  const bodyTypes = useBodyTypes();
  const dialogDelay = useDialogDelay();

  const [page, size, paginationHandler] = usePagination();
  const [selection, setSelection] = React.useState<Array<GridRowId>>([]);

  const row = bodyTypes.find(({id}) => id === selection[0])

  const handlePaginationChange = async (pagination: GridPaginationModel, callback: GridCallbackDetails) => {
    resetSelection();
    await paginationHandler(pagination, callback);
  }

  const handleRefreshClick = async (_: React.MouseEvent) => await refresh()
  const handleRowSelectionChange = (selection: GridRowSelectionModel, _: GridCallbackDetails) =>
    resetSelection(selection)
  const handleUnselectClick = (_: React.MouseEvent) => resetSelection();
  const resetSelection = (value: Array<GridRowId> = []) => setSelection(value);

  const refresh = async () => {
    resetSelection();
    await mutate(BodyTypesSWRKey);
  }

  const handleSaveClick = async (bodyType: BodyType, callback: VoidFunction) => {
    try {
      if (row) {
        await Api().bodyType.updateById(row.id, bodyType);
        await callback();
        await refresh();
        toast.success('Body type successfully updated');
      } else {
        await Api().bodyType.create(bodyType);
        await callback();
        await refresh();
        toast.success('Body type successfully saved')
      }
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const handleDeleteClick = async (bodyType: BodyType, callback: VoidFunction) => {
    try {
      await Api().bodyType.deleteById(bodyType.id);
      await callback();
      setTimeout(async () => await refresh(), dialogDelay)
      toast.success('Body type successfully deleted')
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <SettingsTab title="Body Types">
      <Stack direction="row" flex={1} spacing={3}>
        <BodyTypesTabTable
          selection={row}
          rows={bodyTypes}
          columns={BodyTypesColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selection}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationModelChange={handlePaginationChange}
          onRowSelectionModelChange={handleRowSelectionChange}
        />
        <BodyTypesTabForm
          selection={row}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}