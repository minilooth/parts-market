import React from 'react'
import {Stack} from '@mui/material';
import {useRouter} from 'next/router';
import {GridCallbackDetails, GridPaginationModel, GridRowId, GridRowSelectionModel} from '@mui/x-data-grid';
import {toast} from 'react-toastify';

import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {ModelsColumns} from '@core/consts/settings';
import {ModelsTabTable} from '@components/settings/tabs/model/ModelsTabTable';
import {ModelsTabForm} from '@components/settings/tabs/model/ModelsTabForm';
import {PageableUtils} from '@core/utils/pageable';
import {InitialPage, InitialPageSize} from '@core/consts/pagination';
import {useModels} from '@core/hooks/entities/useModels';
import {Model} from '@core/types';
import {DefaultMutateConfiguration, MakesSWRKey, ModelsSWRKey} from '@core/consts/swr';
import {useMutate} from '@core/hooks/useMutate';
import {useDialogDisappearDuration} from '@core/hooks/useDialogDisappearDuration';
import {Api} from '@core/api';

export const ModelsTab: React.FC = () => {
  const router = useRouter();
  const mutate = useMutate();
  const dialogDisappearDuration = useDialogDisappearDuration();

  const page = Number.parseInt(router.query.page as string) || InitialPage;
  const size = Number.parseInt(router.query.size as string) || InitialPageSize;
  const makeId = Number.parseInt(router.query.makeId as string);

  const models = useModels(makeId, {page, size});

  const [selectedIds, setSelectedIds] = React.useState<Array<GridRowId>>([]);
  const selection = models.content.find(({id}) => id === selectedIds?.[0])

  React.useEffect(() => {
    mutate(ModelsSWRKey)
      .catch(toast.error);
  }, [page, size, makeId, mutate])

  React.useEffect(() => {
    return () => {
      mutate(ModelsSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
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
    await mutate(MakesSWRKey)
    await mutate(ModelsSWRKey)
  }

  const handleUnselectClick = (_: React.MouseEvent) => resetSelection();
  const resetSelection = (value: Array<GridRowId> = []) => setSelectedIds(value);

  const postRequestAction = async () => {
    resetSelection();
    await mutate(ModelsSWRKey);
  }

  const handleSaveClick = async (make: Model, callback: VoidFunction) => {
    try {
      if (selection) {
        await Api().model.updateById(selection.id, make);
        await callback();
        await postRequestAction();
        toast.success('Model successfully updated');
      } else {
        await Api().model.create(make);
        await callback();
        await postRequestAction();
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
      setTimeout(async () => await postRequestAction(), dialogDisappearDuration)
      toast.success('Model successfully deleted')
    }
    catch (err) {
      toast.error((err as Error).message)
    }
  }

  return (
    <SettingsTab title="Models">
      <Stack direction="row" flex={1} spacing={3}>
        <ModelsTabTable
          selection={selection}
          rows={models}
          columns={ModelsColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selectedIds}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleRowSelectionChange}
        />
        <ModelsTabForm
          selection={selection}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}