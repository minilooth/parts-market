import {Entity} from "core/types/common";

export interface Authority {
  name: string;
}

export interface User extends Entity {
  username: string;
  firstName: string;
  surname: string;
  patronymic: string;
  authorities: Array<Authority>;
  avatar: string;
}

export interface Make extends Entity {
  name: string;
}

export interface Model extends Entity {
  name: string;
  makeId: number;
}