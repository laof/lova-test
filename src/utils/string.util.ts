/**
 * Guid
 *
 * @export
 * @class Guid
 */
export class Guid {

    static S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    static guid(): string {

        return this.S4() + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4();

    }


}

