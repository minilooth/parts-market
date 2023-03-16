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

  const page = Number.parseInt(router.query.page as string) || InitialPage;
  const size = Number.parseInt(router.query.size as string) || InitialPageSize;
  const make = Number.parseInt(router.query.make as string);

  const mutate = useMutate();
  const dialogDisappearDuration = useDialogDisappearDuration();
  const models = useModels(make, {page, size});
  const [selection, setSelection] = React.useState<Array<GridRowId>>([]);

  const row = models.content.find(({id}) => id === selection[0])

  React.useEffect(() => {
    mutate(ModelsSWRKey)
      .catch(toast.error);
  }, [page, size, make, mutate])

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

  const handleRefreshClick = async (_: React.MouseEvent) => {
    resetSelection();
    await mutate(MakesSWRKey)
    await mutate(ModelsSWRKey)
  }

  const handleRowSelectionChange = (selection: GridRowSelectionModel, _: GridCallbackDetails) =>
    resetSelection(selection)
  const handleUnselectClick = (_: React.MouseEvent) => resetSelection();
  const resetSelection = (value: Array<GridRowId> = []) => setSelection(value);

  const afterActionSucceeded = async () => {
    resetSelection();
    await mutate(ModelsSWRKey);
  }

  const handleSaveClick = async (make: Model, callback: VoidFunction) => {
    try {
      if (row) {
        await Api().model.updateById(row.id, make);
        await callback();
        await afterActionSucceeded();
        toast.success('Model successfully updated');
      } else {
        await Api().model.create(make);
        await callback();
        await afterActionSucceeded();
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
      setTimeout(async () => await afterActionSucceeded(), dialogDisappearDuration)
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