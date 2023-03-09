import {AxiosInstance} from "axios";
import {Make} from "core/types/types";
import {Page, Pageable} from "../../types/common";

export const MakeApi = (instance: AxiosInstance) => ({

  async getAll(pageable: Pageable): Promise<Page<Make>> {
    const { data: makes} = await instance.get<Page<Make>>("/makes", { params: { ...pageable } });
    return makes;
  }

})