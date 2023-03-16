import React from 'react'
import {
  GridCallbackDetails,
  GridRowId,
  GridRowSelectionModel,
  GridPaginationModel
} from '@mui/x-data-grid';
import {toast} from 'react-toastify';
import {Stack} from '@mui/material';

import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {useMutate} from '@core/hooks/useMutate';
import {useDialogDelay} from '@core/hooks/useDialogDelay';
import {TransmissionTypesSWRKey} from '@core/consts/swr';
import {TransmissionType} from '@core/types';
import {Api} from '@core/api';
import {TransmissionTypesColumns} from '@core/consts/settings';
import {useTransmissionTypes} from '@core/hooks/entities/useTransmissionTypes';
import {TransmissionTypesTabTable} from '@components/settings/tabs/transmission-type/TransmissionTypesTabTable';
import {TransmissionTypesTabForm} from '@components/settings/tabs/transmission-type/TransmissionTypesTabForm';
import {usePagination} from '@core/hooks/usePagination';

export const TransmissionTypesTab: React.FC = () => {
  const mutate = useMutate();
  const dialogDelay = useDialogDelay();
  const transmissionTypes = useTransmissionTypes();

  const [page, size, paginationHandler] = usePagination();
  const [selection, setSelection] = React.useState<Array<GridRowId>>([]);

  const row = transmissionTypes.find(({id}) => id === selection[0])

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
    await mutate(TransmissionTypesSWRKey);
  }

  const handleSaveClick = async (transmissionType: TransmissionType, callback: VoidFunction) => {
    try {
      if (row) {
        await Api().transmissionType.updateById(row.id, transmissionType);
        await callback();
        await refresh();
        toast.success('Transmission type successfully updated');
      } else {
        await Api().transmissionType.create(transmissionType);
        await callback();
        await refresh();
        toast.success('Transmission type successfully saved')
      }
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const handleDeleteClick = async (transmissionType: TransmissionType, callback: VoidFunction) => {
    try {
      await Api().transmissionType.deleteById(transmissionType.id);
      await callback();
      setTimeout(async () => await refresh(), dialogDelay)
      toast.success('Transmission type successfully deleted')
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <SettingsTab title="Transmission Types">
      <Stack direction="row" flex={1} spacing={3}>
        <TransmissionTypesTabTable
          selection={row}
          rows={transmissionTypes}
          columns={TransmissionTypesColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selection}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationModelChange={handlePaginationChange}
          onRowSelectionModelChange={handleRowSelectionChange}
        />
        <TransmissionTypesTabForm
          selection={row}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}