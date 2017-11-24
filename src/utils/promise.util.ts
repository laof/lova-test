/**
 * Promise封装
 *
 * @export
 * @class Defer
 */
export class Defer {
    public promise: Promise<any>;
    private _resolve: any;
    private _reject: any;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        })
    }

    public resolve(data: any) {
        this._resolve(data);
    }

    public reject(data: any) {
        this._reject(data);
    }


}

