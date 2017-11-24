
import { ResponseDataType } from './enum.code';


/**
 * 数据返回格式
 *
 * @export
 * @interface ResponseData
 */
export interface ResponseData {
    success: boolean;
    code?: number;
    data?: { [key: string]: any } | any[];
    message?: string;
    info?: any;
    type?: ResponseDataType;
}


export interface Login {
    password: string;
    username: string;
    code?: string;
    version?: string;
    info?: any;
}

