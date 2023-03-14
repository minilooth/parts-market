import useSWR from "swr";

import {User} from "core/types";
import {Optional} from "core/types/common";
import {SessionSWRKey} from "core/consts/swr";

export const useSession = (): Optional<User> => {
  const { data } = useSWR<User>(SessionSWRKey);
  return data;
}