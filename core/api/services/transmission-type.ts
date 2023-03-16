import {AxiosInstance} from '@node_modules/axios';
import {TransmissionType} from '@core/types';
import {TransmissionTypeEndpoint} from '@core/consts/endpoints';

export const TransmissionTypeApi = (instance: AxiosInstance) => ({

  async getAll(): Promise<Array<TransmissionType>> {
    const {data} = await instance.get<Array<TransmissionType>>(TransmissionTypeEndpoint);
    return data;
  },

  async deleteById(id: number): Promise<TransmissionType> {
    const {data} = await instance.delete<TransmissionType>(TransmissionTypeEndpoint + '/' + id);
    return data;
  },

  async updateById(id: number, transmissionType: TransmissionType): Promise<TransmissionType> {
    const {data} = await instance.patch<TransmissionType>(TransmissionTypeEndpoint + '/' + id, transmissionType);
    return data;
  },

  async create(transmissionType: TransmissionType): Promise<TransmissionType> {
    const {data} = await instance.post<TransmissionType>(TransmissionTypeEndpoint, transmissionType);
    return data;
  }

})