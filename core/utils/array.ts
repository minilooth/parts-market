export class ArrayUtils {

  static isEmpty<T>(array: Array<T>): boolean {
    return array?.length === 0
  }

}