import * as mysql from 'mysql';
import { QueryFunction, Pool } from 'mysql';

import config from '../app.config';

import * as os from 'os';
import { ResponseData, ResponseDataType } from '../code/index';
import { Defer } from './promise.util';


let pool = config._DEBUG || mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port
});


export class SqlHelper {

    private static _getConnection(): Promise<any> {

        const defer = new Defer();

        (<Pool>pool).getConnection((err: any, conn: any) => {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(conn);
            }

        });


        return defer.promise;
    }

    private static _query(sql: string, value: any[], conn: any): Promise<any> {

        const defer = new Defer();

        conn.query(sql, value, (err: any, rows: any) => {
            conn.release();
            if (err) {
                defer.reject(<ResponseData>{ success: false, type: ResponseDataType.db, message: err });
            } else {
                defer.resolve(<ResponseData>{ success: true, type: ResponseDataType.db, data: rows });
            }

        });

        return defer.promise;

    }

    static async exec(sql: string, value: any[] = []): Promise<any> {

        let rows, conn;

        if (config._DEBUG) {
            return Promise.resolve(<ResponseData>{ success: false, type: ResponseDataType.mock });
        }

        try {

            conn = await this._getConnection();
            rows = await this._query(sql, value, conn);

        } catch (e) {
            rows = Promise.resolve(<ResponseData>{ success: false, type: ResponseDataType.error, message: e });
        }


        return Promise.race([rows]);
    }


}
