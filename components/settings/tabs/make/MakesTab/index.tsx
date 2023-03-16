import React from 'react';
import {GridCallbackDetails, GridPaginationModel, GridRowId, GridRowSelectionModel} from '@mui/x-data-grid';
import {Stack} from '@mui/material';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

import {MakesColumns} from '@core/consts/settings';
import {InitialPage, InitialPageSize} from '@core/consts/pagination';
import {SettingsTab} from '@components/settings/tabs/wrapper/SettingsTab';
import {MakesTabForm} from '@components/settings/tabs/make/MakesTabForm';
import {MakesTabTable} from '@components/settings/tabs/make/MakesTabTable';
import {PageableUtils} from '@core/utils/pageable';
import {useMakes} from '@core/hooks/entities/useMakes';
import {Make} from '@core/types';
import {DefaultMutateConfiguration, MakesSWRKey} from '@core/consts/swr';
import {useMutate} from '@core/hooks/useMutate';
import {Api} from '@core/api';
import {useDialogDisappearDuration} from '@core/hooks/useDialogDisappearDuration';

export const MakesTab: React.FC = () => {
  const router = useRouter();

  const page = Number.parseInt(router.query.page as string) || InitialPage;
  const size = Number.parseInt(router.query.size as string) || InitialPageSize;

  const mutate = useMutate();
  const dialogDisappearDuration = useDialogDisappearDuration();
  const makes = useMakes({page, size});
  const [selection, setSelection] = React.useState<Array<GridRowId>>([]);

  const row = makes.content.find(({id}) => id === selection[0])

  React.useEffect(() => {
    mutate(MakesSWRKey)
      .catch(toast.error)
  }, [page, size, mutate])

  React.useEffect(() => {
    return () => {
      mutate(MakesSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
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
    await mutate(MakesSWRKey);
  }

  const handleRowSelectionChange = (selection: GridRowSelectionModel, _: GridCallbackDetails) =>
    resetSelection(selection)
  const handleUnselectClick = (_: React.MouseEvent) => resetSelection();
  const resetSelection = (value: Array<GridRowId> = []) => setSelection(value);

  const afterActionSucceeded = async () => {
    resetSelection();
    await mutate(MakesSWRKey);
  }

  const handleSaveClick = async (make: Make, callback: VoidFunction) => {
    try {
      if (row) {
        await Api().make.updateById(row.id, make);
        await callback();
        await afterActionSucceeded();
        toast.success('Make successfully updated');
      } else {
        await Api().make.create(make);
        await callback();
        await afterActionSucceeded();
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
      setTimeout(async () => await afterActionSucceeded(), dialogDisappearDuration)
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