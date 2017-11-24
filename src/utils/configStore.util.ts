import * as Store from 'configstore';


/**

// create a Configstore instance with an unique ID e.g.
// Package name and optionally some default values
const conf = new Store(pkg.name, { foo: 'bar' });

console.log(conf.get('foo'));
// => 'bar'

conf.set('awesome', true);
console.log(conf.get('awesome'));
// => true

// Use dot-notation to access nested properties
conf.set('bar.baz', true);
console.log(conf.get('bar'));
// => {baz: true}

conf.delete('awesome');
console.log(conf.get('awesome'));
// => undefined

**/


export class JsonStore {

    private store: Store;

    constructor(table: string) {

        this.store = new Store(table, null, { globalConfigPath: true });

    }

    set(key: string, data: any) {

        this.store.set(key, data);
    }
    get(key: string) {
        return this.store.get(key);
    }

    delete(key: string) {
        this.store.delete(key);
    }

}

