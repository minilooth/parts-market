import {AxiosInstance} from 'axios';

import {Generation} from '@core/types';
import {GenerationEndpoint} from '@core/consts/endpoints';

export const GenerationApi = (instance: AxiosInstance) => ({

  async getAll(modelId?: number): Promise<Array<Generation>> {
    const {data} = await instance.get<Array<Generation>>(GenerationEndpoint, {params: {modelId: modelId || undefined}});
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