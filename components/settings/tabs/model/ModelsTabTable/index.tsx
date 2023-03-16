import React from 'react'
import {Button, Fade, Stack, Typography} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import {FormProvider, useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {StaticImageData} from 'next/image';

import {CustomDataGrid} from '@components/common/wrappers/CustomDataGrid';
import {DefaultPageSizeOptions} from '@core/consts/pagination';
import {Model} from '@core/types';
import {FormInputDropdown} from '@components/common/form/FormInputDropdown';
import {useMakes} from '@core/hooks/entities/useMakes';
import {PageableUtils} from '@core/utils/pageable';
import {DefaultMutateConfiguration, MakesSWRKey} from '@core/consts/swr';
import {useMutate} from '@core/hooks/useMutate';
import {SettingsTabTableProps} from '@core/types/settings';

import NotFound from '@public/web-page.png'
import PleaseSelect from '@public/cinema-seat.png';

const resolveNoRowsOverlayText = (make: number): string => {
  if (!make) {
    return 'Please select make'
  }
  return 'No data found in database';
}

const resolveNoRowsOverlayImage = (make: number): StaticImageData => {
  if (!make) {
    return PleaseSelect;
  }
  return NotFound;
}

export const ModelsTabTable: React.FC<SettingsTabTableProps<Model>> = (props) => {
  const {selection, onRefreshClick, onUnselectClick, ...other} = props

  const router = useRouter();
  
  const make = Number.parseInt(router.query.make as string);
  
  const mutate = useMutate();
  const makes = useMakes();
  const methods = useForm({mode: 'onChange', values: router.query})

  const noRowsOverlayText = resolveNoRowsOverlayText(make);
  const noRowsOverlayImage = resolveNoRowsOverlayImage(make);

  React.useEffect(() => {
    mutate(MakesSWRKey)
      .catch(toast.error);
    return () => {
      mutate(MakesSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
        .catch(toast.error)
    }
  }, [mutate])

  const handleMakeChange = async (make?: number) => {
    const {page, size, ...other} = router.query;
    const url = {
      pathname: router.pathname,
      query: {...other, make: make}
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
            onResetClick={() => handleMakeChange()}
            onChange={(event) => handleMakeChange(Number.parseInt(event.target?.value))}
          />
        </FormProvider>
      </Stack>
      <Stack direction="row" alignItems="end">
        <Typography variant="subtitle1" component="span" lineHeight={1} flexGrow={1}>
          Models that stored in database:
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
  )
}