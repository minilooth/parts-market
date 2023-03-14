import {AxiosInstance} from "axios";

import {Page, Pageable} from "@core/types/common";
import {Generation} from "@core/types";

export const GenerationApi = (instance: AxiosInstance) => ({

  async getAll(modelId: number, pageable?: Pageable): Promise<Page<Generation>> {
    const {data: generations} = await instance.get<Page<Generation>>("/generations", {params: {...pageable, modelId: modelId}});
    return generations;
  }

})