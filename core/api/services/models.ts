import {AxiosInstance} from "axios";
import {Page, Pageable} from "../../types/common";
import {Model} from "../../types";

export const ModelApi = (instance: AxiosInstance) => ({

  async getAll(makeId: number, pageable?: Pageable): Promise<Page<Model>> {
    const {data: models} = await instance.get<Page<Model>>("/models", {params: {...pageable, makeId: makeId}});
    return models;
  }

})