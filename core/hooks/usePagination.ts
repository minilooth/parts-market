import {useRouter} from 'next/router';
import {GridCallbackDetails, GridPaginationModel} from '@mui/x-data-grid';

import {InitialPage, InitialPageSize} from '@core/consts/pagination';
import {useNumberedQueryParam} from '@core/hooks/useNumberedQueryParam';

export const usePagination = (): [number, number, (pagination: GridPaginationModel, _: GridCallbackDetails) => Promise<void>] => {
  const router = useRouter();
  const page = useNumberedQueryParam('page') || InitialPage;
  const size = useNumberedQueryParam('size') || InitialPageSize;

  const onPaginationChange = async (pagination: GridPaginationModel, _: GridCallbackDetails) => {
    const nextPage = pagination.pageSize !== size ? 1 : pagination.page + 1;
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: nextPage,
        size: pagination.pageSize
      }
    })
  };

  return [page, size, onPaginationChange];
}