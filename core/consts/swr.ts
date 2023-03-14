import {MutatorOptions, SWRConfiguration} from "swr";

export const MakesSWRKey = "MAKES";
export const ModelsSWRKey = "MODELS";
export const SessionSWRKey = "SESSION";

export const DefaultSWRConfiguration: SWRConfiguration = {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  keepPreviousData: true
}

export const DefaultMutateConfiguration: MutatorOptions = {
  revalidate: false
}