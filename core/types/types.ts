import {Entity} from "./common";

export interface Make extends Entity {
  name: string;
}

export interface Model extends Entity {
  name: string;
  makeId: number;
}