import React from 'react'
import {Stack} from '@mui/material';
import {GridCallbackDetails, GridRowId, GridRowSelectionModel, GridPaginationModel} from '@mui/x-data-grid';
import {toast} from 'react-toastify';

import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {ModelsColumns} from '@core/consts/settings';
import {ModelsTabTable} from '@components/settings/tabs/model/ModelsTabTable';
import {ModelsTabForm} from '@components/settings/tabs/model/ModelsTabForm';
import {useModels} from '@core/hooks/entities/useModels';
import {Model} from '@core/types';
import {DefaultMutateConfiguration, ModelsSWRKey} from '@core/consts/swr';
import {useMutate} from '@core/hooks/useMutate';
import {useDialogDelay} from '@core/hooks/useDialogDelay';
import {Api} from '@core/api';
import {usePagination} from '@core/hooks/usePagination';
import {useNumberedQueryParam} from '@core/hooks/useNumberedQueryParam';

export const ModelsTab: React.FC = () => {
  const mutate = useMutate();
  const dialogDelay = useDialogDelay();
  const make = useNumberedQueryParam('make');
  const [page, size, paginationHandler] = usePagination();
  const models = useModels(make);
  const [selection, setSelection] = React.useState<Array<GridRowId>>([]);

  const row = models.find(({id}) => id === selection[0])

  React.useEffect(() => {
    if (make) {
      mutate(ModelsSWRKey).catch(toast.error);
    }
    else {
      mutate(ModelsSWRKey, [], DefaultMutateConfiguration).catch(toast.error)
    }
  }, [make, mutate])

  React.useEffect(() => {
    return () => {
      mutate(ModelsSWRKey, [], DefaultMutateConfiguration).catch(toast.error)
    }
  }, [mutate])

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
    await mutate(ModelsSWRKey);
  }

  const handleSaveClick = async (make: Model, callback: VoidFunction) => {
    try {
      if (row) {
        await Api().model.updateById(row.id, make);
        await callback();
        await refresh();
        toast.success('Model successfully updated');
      } else {
        await Api().model.create(make);
        await callback();
        await refresh();
        toast.success('Model successfully saved')
      }
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const handleDeleteClick = async (make: Model, callback: VoidFunction) => {
    try {
      await Api().model.deleteById(make.id);
      await callback();
      setTimeout(async () => await refresh(), dialogDelay)
      toast.success('Model successfully deleted')
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  return (
    <SettingsTab title="Models">
      <Stack direction="row" flex={1} spacing={3}>
        <ModelsTabTable
          selection={row}
          rows={models}
          columns={ModelsColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selection}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationModelChange={handlePaginationChange}
          onRowSelectionModelChange={handleRowSelectionChange}
        />
        <ModelsTabForm
          selection={row}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}