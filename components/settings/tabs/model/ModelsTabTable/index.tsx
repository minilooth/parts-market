import React from "react"
import {Button, Fade, SelectChangeEvent, Stack, Typography} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import {DataGridProps} from "@mui/x-data-grid";
import {FormProvider, useForm} from "react-hook-form";
import {useRouter} from 'next/router';

import {CustomDataGrid} from "components/common/wrappers/CustomDataGrid";
import {DEFAULT_PAGE_SIZE_OPTIONS} from "core/consts/pagination";
import {Model} from "core/types";
import {Page} from "core/types/common";
import {FormInputDropdown} from "components/common/form/FormInputDropdown";
import {useMakes} from "core/hooks/entities/useMakes";
import {PageableUtils} from "core/utils/pageable";
import {DefaultMutateConfiguration, MakesSWRKey} from "core/consts/swr";
import {useMutate} from "core/hooks/entities/useMutate";

import NotFound from "public/web-page.png"
import PleaseSelect from "public/cinema-seat.png";

interface ModelsTabContentProps {
  selection?: Model | null;
  onRefreshClick: (_: React.MouseEvent) => void;
  onUnselectClick: (_: React.MouseEvent) => void;
  rows: Page<Model>;
  columns: DataGridProps['columns'];
  onPaginationChange: DataGridProps['onPaginationModelChange'];
  onSelectionChange: DataGridProps['onRowSelectionModelChange'];
  rowSelectionModel: DataGridProps['rowSelectionModel'];
  paginationModel: DataGridProps['paginationModel'];
}

export const ModelsTabTable: React.FC<ModelsTabContentProps> = ({
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
  const {makeId} = router.query;

  const methods = useForm({mode: "onChange"})
  const {reset, watch} = methods

  const mutate = useMutate();
  const makes = useMakes();

  React.useEffect(() => {
    if (makes && makes.content.length > 0) {
      reset({makeId})
    }
  }, [makeId, reset, makes])

  React.useEffect(() => {
    mutate(MakesSWRKey)
      .catch(console.error);
    return () => {
      mutate(MakesSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
        .catch(console.error)
    }
  }, [mutate])

  const handleSelectChange = async (event: SelectChangeEvent<unknown>, _: React.ReactNode) => {
    await handleMakeChange(event.target.value as string);
  }

  const handleResetClick = async () => {
    await handleMakeChange();
  }

  const handleMakeChange = async (makeId?: string) => {
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        makeId: makeId
      }
    })
  }

  const resolveNoRowsOverlayLabel = () => {
    const makeId = watch("makeId");
    if (!makeId) {
      return 'Please select make'
    }
    return 'No data found in database';
  }

  const resolveNoRowsOverlayImage = () => {
    const makeId = watch("makeId");
    if (!makeId) {
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
            onResetClick={handleResetClick}
            onChange={handleSelectChange}
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
        rows={rows}
        columns={columns}
        onPaginationModelChange={onPaginationChange}
        onRowSelectionModelChange={onSelectionChange}
        rowSelectionModel={rowSelectionModel}
        paginationModel={paginationModel}
        pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
        noRowsOverlayText={resolveNoRowsOverlayLabel()}
        noRowsOverlayImage={resolveNoRowsOverlayImage()}
      />
    </Stack>
  )
}