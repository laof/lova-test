
/**
 * 返回数据的数据来源
 *
 * @export
 * @enum {number}
 */
export enum ResponseDataType {
    mock = 'mock',
    db = 'db',
    error = 'error'
}



export enum ErrorType {
    NullParameter = 'Parameter Error:The necessary parameters are not null',
    NoLogin = 'Permission Error:No permission, please login'
}
