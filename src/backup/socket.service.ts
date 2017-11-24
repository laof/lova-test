import * as webSocket from 'socket.io';

export class WebSocket {

    static start(server: any) {


        const socket = webSocket(server);


        socket.on('connection', (socket) => {

            socket.on('group', (data) => {
                // console.log('add group........')
                socket.join('group');
            });

            // console.log('add socket success');

            socket.on('login', (data) => {
                // console.log(data);
            })
            socket.on('message', (msg) => {
                // console.dir(msg);
            });

            socket.broadcast.emit('server not me', { data: 'hello,everyone' });

            socket.emit('server send', { code: 200, data: new Date().toLocaleString() });
        })

        return server;
    }

}
