import {AxiosInstance} from 'axios';

import {BodyType} from '@core/types';
import {BodyTypeEndpoint} from '@core/consts/endpoints';

export const BodyTypeApi = (instance: AxiosInstance) => ({

  async getAll(): Promise<Array<BodyType>> {
    const {data} = await instance.get<Array<BodyType>>(BodyTypeEndpoint);
    return data;
  },

  async deleteById(id: number): Promise<BodyType> {
    const {data} = await instance.delete<BodyType>(BodyTypeEndpoint + '/' + id);
    return data;
  },

  async updateById(id: number, bodyType: BodyType): Promise<BodyType> {
    const {data} = await instance.patch<BodyType>(BodyTypeEndpoint + '/' + id, bodyType);
    return data;
  },

  async create(bodyType: BodyType): Promise<BodyType> {
    const {data} = await instance.post<BodyType>(BodyTypeEndpoint, bodyType);
    return data;
  }

})