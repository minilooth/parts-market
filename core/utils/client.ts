export class ClientUtils {

  static isClient(): boolean {
    return typeof window !== 'undefined'
  }

}