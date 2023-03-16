import {MutatorOptions, SWRConfiguration} from 'swr';

export const MakesSWRKey = 'MAKES';
export const ModelsSWRKey = 'MODELS';
export const GenerationsSWRKey = 'GENERATIONS';
export const BodyTypesSWRKey = 'BODY_TYPES';
export const EngineTypesSWRKey = 'ENGINE_TYPES';
export const TransmissionTypesSWRKey = 'TRANSMISSION_TYPES';
export const SessionSWRKey = 'SESSION';

export const DefaultSWRConfiguration: SWRConfiguration = {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  keepPreviousData: true
}

export const DefaultMutateConfiguration: MutatorOptions = {
  revalidate: false
}