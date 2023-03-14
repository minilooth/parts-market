import React from 'react';
import {useRouter} from "next/router";
import {Button, Fade, SelectChangeEvent, Stack, Typography} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import {FormProvider, useForm} from "react-hook-form";

import {Generation} from "@core/types";
import {useMutate} from "@core/hooks/useMutate";
import {useMakes} from "@core/hooks/entities/useMakes";
import {DefaultMutateConfiguration, MakesSWRKey, ModelsSWRKey} from "@core/consts/swr";
import {PageableUtils} from "@core/utils/pageable";
import {useModels} from "@core/hooks/entities/useModels";
import {FormInputDropdown} from "@components/common/form/FormInputDropdown";
import {CustomDataGrid} from "@components/common/wrappers/CustomDataGrid";
import {DefaultPageSizeOptions} from "@core/consts/pagination";
import {SettingsTabTableProps} from "@core/types/settings";

import NotFound from "@public/web-page.png";
import PleaseSelect from "@public/cinema-seat.png";

export const GenerationsTabTable: React.FC<SettingsTabTableProps<Generation>> = ({
                                                                                   selection,
                                                                                   onRefreshClick,
                                                                                   onUnselectClick,
                                                                                   rows,
                                                                                   columns,
                                                                                   onPaginationChange,
                                                                                   onSelectionChange,
                                                                                   rowSelectionModel,
                                                                                   paginationModel
                                                                                 }) => {
  const router = useRouter();

  const makeId = Number.parseInt(router.query.makeId as string) || undefined;
  const modelId = Number.parseInt(router.query.modelId as string) || undefined;

  const methods = useForm({mode: "onChange"})
  const {reset, watch, setValue} = methods

  const mutate = useMutate();
  const makes = useMakes();
  const models = useModels(makeId);

  const selectedMakeId = watch("makeId");
  const selectedModelId = watch("modelId");

  React.useEffect(() => {
    if (makes && makes.content.length > 0) {
      setValue("makeId", makeId)
    }
    if (models && models.content.length > 0) {
      setValue("modelId", modelId)
    }
  }, [makeId, modelId, reset, setValue, makes, models])

  React.useEffect(() => {
    mutate(MakesSWRKey)
      .catch(console.error);
    return () => {
      mutate(MakesSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
        .catch(console.error)
    }
  }, [mutate])

  React.useEffect(() => {
    mutate(ModelsSWRKey)
      .catch(console.error);
    return () => {
      mutate(ModelsSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
        .catch(console.error)
    }
  }, [makeId, mutate])

  const handleMakeSelectChange = async (event: SelectChangeEvent<unknown>, _: React.ReactNode) => {
    await handleSelectionChange(Number.parseInt(event.target.value as string));
  }

  const handleModelSelectChange = async (event: SelectChangeEvent<unknown>, _: React.ReactNode) => {
    await handleSelectionChange(makeId, Number.parseInt(event.target.value as string));
  }

  const handleModelResetClick = async () => {
    await handleSelectionChange(makeId);
  }

  const handleMakeResetClick = async () => {
    await handleSelectionChange();
  }

  const handleSelectionChange = async (makeId?: number, modelId?: number) => {
    setValue("makeId", makeId)
    setValue("modelId", modelId)
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        makeId: makeId,
        modelId: modelId
      }
    })
  }

  const resolveNoRowsOverlayLabel = () => {
    if (!selectedMakeId) {
      return 'Please select make'
    }
    if (!selectedModelId) {
      return 'Please select model'
    }
    return 'No data found in database';
  }

  const resolveNoRowsOverlayImage = () => {
    if (!selectedMakeId || !selectedModelId) {
      return PleaseSelect;
    }
    return NotFound;
  }

  return (
    <Stack flex={1} minWidth="400px" spacing={1}>
      <Stack width="300px">
        <FormProvider {...methods}>
          <FormInputDropdown
            size="small"
            name="makeId"
            options={makes.content}
            defaultValue=""
            placeholder="Please select..."
            labelKey="name"
            valueKey="id"
            label="Make"
            margin="normal"
            onResetClick={handleMakeResetClick}
            onChange={handleMakeSelectChange}
          />
          <FormInputDropdown
            size="small"
            name="modelId"
            options={models.content}
            defaultValue=""
            placeholder="Please select..."
            labelKey="name"
            valueKey="id"
            label="Model"
            margin="normal"
            disabled={!selectedMakeId}
            onResetClick={handleModelResetClick}
            onChange={handleModelSelectChange}
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
        rows={rows}
        columns={columns}
        onPaginationModelChange={onPaginationChange}
        onRowSelectionModelChange={onSelectionChange}
        rowSelectionModel={rowSelectionModel}
        paginationModel={paginationModel}
        pageSizeOptions={DefaultPageSizeOptions}
        noRowsOverlayText={resolveNoRowsOverlayLabel()}
        noRowsOverlayImage={resolveNoRowsOverlayImage()}
      />
    </Stack>
  );
};
