import {GetServerSidePropsContext, NextPageContext} from 'next';

import {MakeApi} from '@core/api/services/make';
import {Axios} from '@core/axios';
import {AuthApi} from '@core/api/services/auth';
import {ModelApi} from '@core/api/services/models';
import {GenerationApi} from '@core/api/services/generation';
import {BodyTypeApi} from '@core/api/services/body-type';
import {EngineTypeApi} from '@core/api/services/engine-type';
import {TransmissionTypeApi} from '@core/api/services/transmission-type';

interface ApiReturnType {
  make: ReturnType<typeof MakeApi>;
  model: ReturnType<typeof ModelApi>;
  generation: ReturnType<typeof GenerationApi>;
  bodyType: ReturnType<typeof BodyTypeApi>;
  engineType: ReturnType<typeof EngineTypeApi>;
  transmissionType: ReturnType<typeof TransmissionTypeApi>;
  auth: ReturnType<typeof AuthApi>;
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const apis = {
    make: MakeApi,
    model: ModelApi,
    generation: GenerationApi,
    bodyType: BodyTypeApi,
    engineType: EngineTypeApi,
    transmissionType: TransmissionTypeApi,
    auth: AuthApi
  }

  return Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(Axios())
    };
  }, {} as ApiReturnType);
}