import React from "react"
import {SettingsTab} from "../../wrapper/SettingsTab";
import {MakesTabTable} from "../../make/MakesTabTable";
import {MAKES_COLUMNS} from "../../../../../core/consts/settings";
import {MakesTabForm} from "../../make/MakesTabForm";
import {Stack} from "@mui/material";
import {ModelsTabTable} from "../ModelsTabTable";
import {ModelsTabForm} from "../ModelsTabForm";

export const ModelsTab: React.FC = () => {
  const handleRefreshClick = async (_: React.MouseEvent) => {
    // await mutate();
  }

  const handleUnselectClick = async (_: React.MouseEvent) => {
    // await setSelectedRows([]);
  }

  return (
    <SettingsTab title="Models">
      <Stack direction="row" flex={1} spacing={3}>
        <ModelsTabTable
          selection={null}
          // rows={data}
          // columns={MAKES_COLUMNS}
          // paginationModel={{page: page - 1, pageSize: size}}
          // rowSelectionModel={selectedRows}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          // onPaginationChange={handlePaginationChange}
          // onSelectionChange={handleRowSelectionChange}
        />
        <ModelsTabForm
          // selection={selectedMake}
        />
      </Stack>
    </SettingsTab>
  )
}