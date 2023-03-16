import React from 'react';
import {useRouter} from 'next/router';
import {Button, Fade, Stack, Typography} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import {FormProvider, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {StaticImageData} from 'next/image';

import {Generation} from '@core/types';
import {useMutate} from '@core/hooks/useMutate';
import {useMakes} from '@core/hooks/entities/useMakes';
import {DefaultMutateConfiguration, MakesSWRKey, ModelsSWRKey} from '@core/consts/swr';
import {PageableUtils} from '@core/utils/pageable';
import {useModels} from '@core/hooks/entities/useModels';
import {FormInputDropdown} from '@components/common/form/FormInputDropdown';
import {CustomDataGrid} from '@components/common/wrappers/CustomDataGrid';
import {DefaultPageSizeOptions} from '@core/consts/pagination';
import {SettingsTabTableProps} from '@core/types/settings';
import {ArrayUtils} from '@core/utils/array';

import NotFound from '@public/web-page.png';
import PleaseSelect from '@public/cinema-seat.png';

const resolveNoRowsOverlayText = (make: number, model: number): string => {
  if (!make) {
    return 'Please select make'
  }
  if (!model) {
    return 'Please select model'
  }
  return 'No data found in database';
}

const resolveNoRowsOverlayImage = (make: number, model: number): StaticImageData => {
  if (!make || !model) {
    return PleaseSelect;
  }
  return NotFound;
}

export const GenerationsTabTable: React.FC<SettingsTabTableProps<Generation>> = (props) => {
  const {selection, onRefreshClick, onUnselectClick, ...other} = props;

  const router = useRouter();
  
  const make = Number.parseInt(router.query.make as string);
  const model = Number.parseInt(router.query.model as string);
  
  const mutate = useMutate();
  const makes = useMakes();
  const models = useModels(make);
  const methods = useForm({mode: 'onChange', values: router.query})

  const noRowsOverlayText = resolveNoRowsOverlayText(make, model);
  const noRowsOverlayImage = resolveNoRowsOverlayImage(make, model);

  React.useEffect(() => {
    mutate(MakesSWRKey)
      .catch(toast.error);
    return () => {
      mutate(MakesSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
        .catch(toast.error)
    }
  }, [mutate])

  React.useEffect(() => {
    mutate(ModelsSWRKey)
      .catch(toast.error);
    return () => {
      mutate(ModelsSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
        .catch(toast.error)
    }
  }, [make, mutate])

  const handleSelectionChange = async (make?: number, model?: number) => {
    const { page, size, ...other } = router.query;
    const url = {
      pathname: router.pathname, 
      query: {...other, make: make, model: model}
    }
    await router.push(url)
  }

  return (
    <Stack flex={1} minWidth="400px" spacing={1}>
      <Stack width="300px">
        <FormProvider {...methods}>
          <FormInputDropdown
            size="small"
            name="make"
            options={makes.content}
            defaultValue=""
            placeholder="Please select..."
            labelKey="name"
            valueKey="id"
            label="Make"
            margin="normal"
            onResetClick={() => handleSelectionChange()}
            onChange={(event) => handleSelectionChange(Number.parseInt(event.target?.value))}
          />
          <FormInputDropdown
            size="small"
            name="model"
            options={models.content}
            defaultValue=""
            placeholder="Please select..."
            labelKey="name"
            valueKey="id"
            label="Model"
            margin="normal"
            disabled={!model && ArrayUtils.isEmpty(models.content)}
            onResetClick={() => handleSelectionChange(make)}
            onChange={(event) => handleSelectionChange(make, Number.parseInt(event.target?.value))}
          />
        </FormProvider>
      </Stack>
      <Stack direction="row" alignItems="end">
        <Typography variant="subtitle1" component="span" lineHeight={1} flexGrow={1}>
          Generations that stored in database:
        </Typography>
        <Stack direction="row" spacing={1}>
          <Fade in={!!selection} unmountOnExit>
            <Button variant="contained" startIcon={<ClearIcon/>} size="small" onClick={onUnselectClick}>
              Unselect
            </Button>
          </Fade>
          <Button variant="contained" startIcon={<RefreshIcon/>} size="small" onClick={onRefreshClick}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      <CustomDataGrid
        {...other}
        pageSizeOptions={DefaultPageSizeOptions}
        noRowsOverlayText={noRowsOverlayText}
        noRowsOverlayImage={noRowsOverlayImage}
      />
    </Stack>
  );
};
