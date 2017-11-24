import * as Express from 'express';
import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from 'ts-express-decorators';
import * as Path from 'path';
import * as cors from 'cors';
import * as http from 'http';

// import { WebSocket } from './src/services/socket.service';

import config from './src/app.config';

const bp = config.basePath;

const filepath: any = {};

const rootDir: string = Path.resolve(__dirname);

if (config.pathToken === 'SRC') {

    filepath.static = `.${bp}webapp`;
    filepath.rootDir = rootDir + `${bp}src${bp}views`;
    filepath.scan = `${rootDir}${bp}src${bp}services${bp}**${bp}**.ts`;

} else {
    filepath.static = `.${bp}dist${bp}webapp`;
    filepath.rootDir = rootDir + `${bp}src${bp}views`;
    filepath.scan = `${rootDir}${bp}src${bp}services${bp}**${bp}**.js`;
}




@ServerSettings({
    rootDir: rootDir,
    acceptMimes: ['application/json'],
    httpPort: 18080,
    endpointUrl: '/',
    componentsScan: [
        filepath.scan
    ],
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void | Promise<any> {

        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override');

        this
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(cors())
            .use(Express.static(filepath.static))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        // WebSocket.start(this.expressApp.socket);

        this
            .set('view engine', 'ejs')
            .set('views', filepath.rootDir);

    }

    public $onReady() {
        console.log('Server started...');
    }

    public $onServerInitError(err: any) {
        console.error(err);
    }
    static Init(): void {
        let server = new Server();
        server.start();

    }

}

Server.Init();
