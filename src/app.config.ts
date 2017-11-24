

export interface MySqlLink {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number
}

export interface Config {
    window: boolean;
    linux: boolean;
    platform: string;
    _DEBUG: boolean;
    servicesDir: string;
    mysql: MySqlLink;
    basePath: string;
    pathToken: string;
}


let platform = process.platform;
let linux = platform === 'linux';
let win32 = platform === 'win32';
let Debug = win32;
let fileType = '';
let basePath = '';
if (linux) {
    basePath = '/';
    fileType = 'js';

} else if (win32) {
    basePath = '\\';
    fileType = 'ts';
}

export default <Config>{
    window: win32,
    linux: linux,
    platform: platform,
    basePath: basePath,
    _DEBUG: Debug,
    pathToken: 'SRC',
    servicesDir: '/main/services/**\/*.' + fileType,
    mysql: <MySqlLink>{
        host: 'sqld.duapp.com',
        user: 'e82dad73c00240e1881c8f48a42c5eaa',
        password: 'd40289a315204d90b5208422006ab6d4',
        database: 'ustacjJlXYOgINRImIAT',
        port: 4050
    }
}
