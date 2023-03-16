import {AxiosInstance} from '@node_modules/axios';
import {Page, Pageable} from '@core/types/common';
import {TransmissionType} from '@core/types';
import {TransmissionTypeEndpoint} from '@core/consts/endpoints';

export const TransmissionTypeApi = (instance: AxiosInstance) => ({

  async getAll(pageable?: Pageable): Promise<Page<TransmissionType>> {
    const {data} = await instance.get<Page<TransmissionType>>(TransmissionTypeEndpoint, {params: {...pageable}});
    return data;
  },

})