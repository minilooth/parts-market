import React from 'react';
import {Stack} from '@mui/material';
import {useRouter} from 'next/router';
import {GridCallbackDetails, GridPaginationModel, GridRowId, GridRowSelectionModel} from '@mui/x-data-grid';
import {toast} from 'react-toastify';

import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {GenerationsColumns} from '@core/consts/settings';
import {GenerationsTabTable} from '@components/settings/tabs/generation/GenerationsTabTable';
import {GenerationsTabForm} from '@components/settings/tabs/generation/GenerationsTabForm';
import {InitialPage, InitialPageSize} from '@core/consts/pagination';
import {useMutate} from '@core/hooks/useMutate';
import {Generation} from '@core/types';
import {DefaultMutateConfiguration, GenerationsSWRKey, MakesSWRKey, ModelsSWRKey} from '@core/consts/swr';
import {PageableUtils} from '@core/utils/pageable';
import {useGenerations} from '@core/hooks/entities/useGenerations';
import {useDialogDisappearDuration} from '@core/hooks/useDialogDisappearDuration';
import {Api} from '@core/api';

export const GenerationsTab: React.FC = () => {
  const router = useRouter();
  const mutate = useMutate();
  const dialogDisappearDuration = useDialogDisappearDuration();

  const page = Number.parseInt(router.query.page as string) || InitialPage;
  const size = Number.parseInt(router.query.size as string) || InitialPageSize;
  const modelId = Number.parseInt(router.query.modelId as string);

  const generations = useGenerations(modelId, {page, size});

  const [selectedIds, setSelectedIds] = React.useState<Array<GridRowId>>([]);
  const selection = generations.content.find(({id}) => id === selectedIds?.[0])

  React.useEffect(() => {
    mutate(GenerationsSWRKey)
      .catch(toast.error);
  }, [page, size, modelId, mutate])

  React.useEffect(() => {
    return () => {
      mutate(GenerationsSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
        .catch(toast.error)
    }
  }, [mutate])

  const handlePaginationChange = async (pagination: GridPaginationModel, _: GridCallbackDetails) => {
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pagination.page + 1,
        size: pagination.pageSize
      }
    })
  }

  const handleRowSelectionChange = (selection: GridRowSelectionModel, _: GridCallbackDetails) => {
    resetSelection(selection)
  }

  const handleRefreshClick = async (_: React.MouseEvent) => {
    resetSelection();
    await mutate(MakesSWRKey);
    await mutate(ModelsSWRKey);
    await mutate(GenerationsSWRKey);
  }

  const handleUnselectClick = (_: React.MouseEvent) => resetSelection();
  const resetSelection = (value: Array<GridRowId> = []) => setSelectedIds(value);

  const postRequestAction = async () => {
    resetSelection();
    await mutate(GenerationsSWRKey);
  }

  const handleSaveClick = async (generation: Generation, callback: VoidFunction) => {
    try {
      if (selection) {
        await Api().generation.updateById(selection.id, generation);
        await callback();
        await postRequestAction();
        toast.success('Generation successfully updated');
      } else {
        await Api().generation.create(generation);
        await callback();
        await postRequestAction();
        toast.success('Generation successfully saved')
      }
    }
    catch (err) {
      toast.error((err as Error).message);
    }
  }

  const handleDeleteClick = async (generation: Generation, callback: VoidFunction) => {
    try {
      await Api().generation.deleteById(generation.id);
      await callback();
      setTimeout(async () => await postRequestAction(), dialogDisappearDuration)
      toast.success('Generation successfully deleted')
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <SettingsTab title="Generations">
      <Stack direction="row" flex={1} spacing={3}>
        <GenerationsTabTable
          selection={selection}
          rows={generations}
          columns={GenerationsColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selectedIds}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleRowSelectionChange}
        />
        <GenerationsTabForm
          selection={selection}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}