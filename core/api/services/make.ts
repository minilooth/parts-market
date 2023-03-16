import {AxiosInstance} from 'axios';

import {Make} from '@core/types';
import {MakeEndpoint} from '@core/consts/endpoints';

export const MakeApi = (instance: AxiosInstance) => ({

  async getAll(): Promise<Array<Make>> {
    const {data} = await instance.get<Array<Make>>(MakeEndpoint);
    return data;
  },

  async deleteById(id: number): Promise<Make> {
    const {data} = await instance.delete<Make>(MakeEndpoint + '/' + id);
    return data;
  },

  async updateById(id: number, make: Make): Promise<Make> {
    const {data} = await instance.patch<Make>(MakeEndpoint + '/' + id, make);
    return data;
  },

  async create(make: Make): Promise<Make> {
    const {data} = await instance.post<Make>(MakeEndpoint, make);
    return data;
  }

})