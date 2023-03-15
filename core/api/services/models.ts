import {AxiosInstance} from 'axios';

import {Page, Pageable} from '@core/types/common';
import {Model} from '@core/types';
import {ModelEndpoint} from '@core/consts/endpoints';

export const ModelApi = (instance: AxiosInstance) => ({

  async getAll(makeId: number, pageable?: Pageable): Promise<Page<Model>> {
    const {data} = await instance.get<Page<Model>>(ModelEndpoint, {params: {...pageable, makeId: makeId}});
    return data;
  },

  async deleteById(id: number): Promise<Model> {
    const {data} = await instance.delete(ModelEndpoint + '/' + id);
    return data;
  },

  async updateById(id: number, model: Model): Promise<Model> {
    const {data} = await instance.patch(ModelEndpoint + '/' + id);
    return data;
  },

  async create(model: Model): Promise<Model> {
    const {data} = await instance.post(ModelEndpoint, model);
    return data;
  }

})