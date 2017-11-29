import { Controller, Get, PathParams, ResponseView, Post } from 'ts-express-decorators';
import { Time } from '../utils/time.util';
import { SocketService } from './socket.service';

interface Test {
    id: string,
    name: string,
    date?: string
}

@Controller('/')
export class IndexCtrl {

    constructor(private socketService: SocketService) {
        socketService.onConnection(this.onConnection);
    }

    private onConnection = (socket: any) => {

        socket.on('group', (data: any) => {
            console.log('add group........')
            socket.join('group');
        });

        console.log('add socket success');

        socket.on('login', (data: any) => {
            console.log(data);
        })
        socket.on('message', (msg: any) => {
            console.dir(msg);
        });

        socket.broadcast.emit('server not me', { data: 'hello,everyone' });

        socket.emit('server send', { code: 200, data: new Date().toLocaleString() });
    }

    @Post('/:id')
    async get( @PathParams('id') id: string): Promise<Test> {

        return {
            id,
            name: 'test'
        };
    }

    @Get('/')
    @ResponseView('index')
    async renderIndex(request: Express.Request, response: Express.Response): Promise<Test> {
        return { id: '1', name: 'test', date: Time.getCurrentDate() };
    }
}
