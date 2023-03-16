import {AxiosInstance} from 'axios';
import {Page, Pageable} from '@core/types/common';
import {BodyType} from '@core/types';
import {BodyTypeEndpoint} from '@core/consts/endpoints';

export const BodyTypeApi = (instance: AxiosInstance) => ({

  async getAll(pageable?: Pageable): Promise<Page<BodyType>> {
    const {data} = await instance.get<Page<BodyType>>(BodyTypeEndpoint, {params: {...pageable}});
    return data;
  },

})