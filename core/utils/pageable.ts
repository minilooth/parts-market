import {Page, Pageable} from '@core/types/common';
import {InitialPage, InitialPageSize} from '@core/consts/pagination';

export class PageableUtils {

  static getEmptyPage<T>(): Page<T> {
    return {
      content: [],
      totalElements: 0,
      totalPages: 0,
      pageable: {
        page: InitialPage,
        size: InitialPageSize
      },
      first: true,
      last: true,
      empty: true,
      numberOfElements: 0,
      number: 0,
      size: 0
    }
  }

  static mockPages<T>(content: Array<T>, pageable?: Pageable): Page<T> {
    let slice;
    let totalElements;
    let totalPages;

    if (!pageable) {
      totalElements = content.length;
      totalPages = 1;
      slice = content;
    }
    else {
      totalElements = content.length;
      totalPages = content.length / pageable.size;
      slice = content.slice(pageable.size * (pageable.page - 1), pageable.size * pageable.page);
    }

    return {
      content: slice,
      totalElements: totalElements,
      totalPages: totalPages,
      pageable: {
        page: pageable?.page || 1,
        size: pageable?.size || -1
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