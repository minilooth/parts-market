import React from 'react';
import {Stack} from '@mui/material';
import {GridCallbackDetails, GridRowId, GridRowSelectionModel, GridPaginationModel} from '@mui/x-data-grid';
import {toast} from 'react-toastify';

import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {GenerationsColumns} from '@core/consts/settings';
import {GenerationsTabTable} from '@components/settings/tabs/generation/GenerationsTabTable';
import {GenerationsTabForm} from '@components/settings/tabs/generation/GenerationsTabForm';
import {useMutate} from '@core/hooks/useMutate';
import {Generation} from '@core/types';
import {DefaultMutateConfiguration, GenerationsSWRKey} from '@core/consts/swr';
import {useGenerations} from '@core/hooks/entities/useGenerations';
import {useDialogDelay} from '@core/hooks/useDialogDelay';
import {Api} from '@core/api';
import {usePagination} from '@core/hooks/usePagination';
import {useNumberedQueryParam} from '@core/hooks/useNumberedQueryParam';

export const GenerationsTab: React.FC = () => {
  const mutate = useMutate();
  const dialogDelay = useDialogDelay();
  const model = useNumberedQueryParam('model');
  const generations = useGenerations(model);

  const [page, size, paginationHandler] = usePagination();
  const [selection, setSelection] = React.useState<Array<GridRowId>>([]);

  const row = generations.find(({id}) => id === selection[0])

  React.useEffect(() => {
    if (model) {
      mutate(GenerationsSWRKey).catch(toast.error);
    }
    else {
      mutate(GenerationsSWRKey, [], DefaultMutateConfiguration).catch(toast.error)
    }
  }, [model, mutate])

  React.useEffect(() => {
    return () => {
      mutate(GenerationsSWRKey, [], DefaultMutateConfiguration).catch(toast.error)
    }
  }, [mutate])


  const handlePaginationChange = async (pagination: GridPaginationModel, callback: GridCallbackDetails) => {
    resetSelection();
    await paginationHandler(pagination, callback);
  }

  const clear = async () => await mutate(GenerationsSWRKey, [], DefaultMutateConfiguration);
  const handleRefreshClick = async (_: React.MouseEvent) => refresh();
  const handleRowSelectionChange = (selection: GridRowSelectionModel, _: GridCallbackDetails) =>
    resetSelection(selection)
  const handleUnselectClick = (_: React.MouseEvent) => resetSelection();
  const resetSelection = (value: Array<GridRowId> = []) => setSelection(value);

  const refresh = async () => {
    resetSelection();
    await mutate(GenerationsSWRKey);
  }

  const handleSaveClick = async (generation: Generation, callback: VoidFunction) => {
    try {
      if (row) {
        await Api().generation.updateById(row.id, generation);
        await callback();
        await refresh();
        toast.success('Generation successfully updated');
      } else {
        await Api().generation.create(generation);
        await callback();
        await refresh();
        toast.success('Generation successfully saved')
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  const handleDeleteClick = async (generation: Generation, callback: VoidFunction) => {
    try {
      await Api().generation.deleteById(generation.id);
      await callback();
      setTimeout(async () => await refresh(), dialogDelay)
      toast.success('Generation successfully deleted')
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <SettingsTab title="Generations">
      <Stack direction="row" flex={1} spacing={3}>
        <GenerationsTabTable
          selection={row}
          rows={generations}
          columns={GenerationsColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selection}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationModelChange={handlePaginationChange}
          onRowSelectionModelChange={handleRowSelectionChange}
        />
        <GenerationsTabForm
          selection={row}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}