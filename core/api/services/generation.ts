import {AxiosInstance} from 'axios';

import {Page, Pageable} from '@core/types/common';
import {Generation} from '@core/types';
import {GenerationEndpoint} from '@core/consts/endpoints';

export const GenerationApi = (instance: AxiosInstance) => ({

  async getAll(modelId: number, pageable?: Pageable): Promise<Page<Generation>> {
    const {data} = await instance.get<Page<Generation>>(GenerationEndpoint, {params: {...pageable, modelId: modelId}});
    return data;
  },

  async deleteById(id: number): Promise<Generation> {
    const {data} = await instance.delete<Generation>(GenerationEndpoint + '/' + id);
    return data;
  },

  async updateById(id: number, generation: Generation): Promise<Generation> {
    const {data} = await instance.patch<Generation>(GenerationEndpoint + '/' + id, generation);
    return data;
  },

  async create(generation: Generation): Promise<Generation> {
    const {data} = await instance.post<Generation>(GenerationEndpoint, generation);
    return data;
  }

})