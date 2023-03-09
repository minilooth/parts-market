import {Page, Pageable} from "../types/common";
import {INITIAL_PAGE, INITIAL_PAGE_SIZE} from "../consts/pagination";

export class PageableUtils {

  static getEmptyPage<T>(): Page<T> {
    return {
      content: [],
      totalElements: 0,
      totalPages: 0,
      pageable: {
        page: INITIAL_PAGE,
        size: INITIAL_PAGE_SIZE
      },
      first: true,
      last: true,
      empty: true,
      numberOfElements: 0,
      number: 0,
      size: 0
    }
  }

  static mockPages<T>(content: Array<T>, pageable: Pageable): Page<T> {
    const totalElements = content.length;
    const totalPages = content.length / pageable.size;

    const slice = content.slice(pageable.size * (pageable.page - 1), pageable.size * pageable.page);

    return {
      content: slice,
      totalElements: totalElements,
      totalPages: totalPages,
      pageable: {
        page: pageable.page,
        size: pageable.size
      },
      first: true,
      last: true,
      empty: content.length === 0,
      numberOfElements: 0,
      number: 0,
      size: 0
    }
  }

}