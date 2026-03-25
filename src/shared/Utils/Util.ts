export class Util {

    static generateExpiration(minutes: number) {
      return new Date(Date.now() + minutes * 60 * 1000)
    }

}

