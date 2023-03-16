import {AxiosInstance} from 'axios';

import {EngineType} from '@core/types';
import {EngineTypeEndpoint} from '@core/consts/endpoints';

export const EngineTypeApi = (instance: AxiosInstance) => ({

  async getAll(): Promise<Array<EngineType>> {
    const {data} = await instance.get<Array<EngineType>>(EngineTypeEndpoint);
    return data;
  },

  async deleteById(id: number): Promise<EngineType> {
    const {data} = await instance.delete<EngineType>(EngineTypeEndpoint + '/' + id);
    return data;
  },

  async updateById(id: number, engineType: EngineType): Promise<EngineType> {
    const {data} = await instance.patch<EngineType>(EngineTypeEndpoint + '/' + id, engineType);
    return data;
  },

  async create(engineType: EngineType): Promise<EngineType> {
    const {data} = await instance.post<EngineType>(EngineTypeEndpoint, engineType);
    return data;
  }

})