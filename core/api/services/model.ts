import {AxiosInstance} from 'axios';

import {Model} from '@core/types';
import {ModelEndpoint} from '@core/consts/endpoints';

export const ModelApi = (instance: AxiosInstance) => ({

  async getAll(makeId?: number): Promise<Array<Model>> {
    const {data} = await instance.get<Array<Model>>(ModelEndpoint, {params: {makeId: makeId || undefined}});
    return data;
  },

  async deleteById(id: number): Promise<Model> {
    const {data} = await instance.delete(ModelEndpoint + '/' + id);
    return data;
  },

  async updateById(id: number, model: Model): Promise<Model> {
    const {data} = await instance.patch(ModelEndpoint + '/' + id, model);
    return data;
  },

  async create(model: Model): Promise<Model> {
    const {data} = await instance.post(ModelEndpoint, model);
    return data;
  }

})