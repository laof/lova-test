import { Controller, Get, PathParams, ResponseView, Post } from 'ts-express-decorators';
import { Time } from '../utils/time.util';

interface Test {
    id: string,
    name: string,
    date?: string
}

@Controller('/')
export class IndexCtrl {

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
