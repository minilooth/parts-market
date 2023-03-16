import {AxiosInstance} from 'axios';
import {Page, Pageable} from '@core/types/common';
import {EngineType} from '@core/types';
import {EngineTypeEndpoint} from '@core/consts/endpoints';

export const EngineTypeApi = (instance: AxiosInstance) => ({

  async getAll(pageable?: Pageable): Promise<Page<EngineType>> {
    const {data} = await instance.get<Page<EngineType>>(EngineTypeEndpoint, {params: {...pageable}});
    return data;
  },

})