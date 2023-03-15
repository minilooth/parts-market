import moment from 'moment';

export class FormUtils {

  static transformDatesToMoments(object: any): any {
    return Object.keys(object).reduce((accumulator, key) => {
      if (typeof object[key] === 'object') {
        return {
          [key]: this.transformDatesToMoments(object[key])
        };
      }

      const isString = typeof object[key] === 'string';
      const isDate = Object.prototype.toString.call(object[key]) === '[object Date]' && !isNaN(object[key]);

      if ((isString || isDate) && moment(object[key], moment.ISO_8601, true).isValid()) {
        return {
          ...accumulator,
          [key]: moment(object[key])
        }
      }
      return {
        ...accumulator,
        [key]: object[key]
      }
    }, {});
  }

  static transformMomentsToDates(object: any): any {
    return Object.keys(object).reduce((accumulator, key) => {
      if (!moment.isMoment(object[key]) && typeof object[key] === 'object') {
        return {
          [key]: this.transformMomentsToDates(object[key])
        };
      }

      if (moment.isMoment(object[key])) {
        return {
          ...accumulator,
          [key]: object[key].toDate().toISOString()
        }
      }
      return {
        ...accumulator,
        [key]: object[key]
      }
    }, {});
  }

}