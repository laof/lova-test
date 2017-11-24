import { Controller, Get, PathParams, ResponseView, Post } from 'ts-express-decorators';
import * as Express from 'express';
import { UserDao } from '../dao/user.dao';
import { ErrorType } from '../code/index';
import { Guid } from '../utils/string.util';
import { ResponseData, ResponseDataType } from '../code/index';
import { Session } from 'inspector';

import * as _ from 'lodash';

export interface UserInterface {
    password: string;
    username: string;
    id?: number;
    code?: string;
    email?: string;
    lastTime?: string;
    registerTime?: string;
    version?: string;
    info?: any;
    mark?: any;
}

@Controller('/user')
export class UserCtrl {

    parametersError() {

        return Promise.resolve(<ResponseData>{ success: false, message: ErrorType.NullParameter });
    }

    @Get('/')
    @ResponseView('login')
    renderLogin(request: Express.Request, response: Express.Response): ResponseData {

        return <ResponseData>{ success: true, data: [] };
    }

    @Post('/info')
    async post(request: Express.Request, response: Express.Response): Promise<ResponseData> {

        let param = <UserInterface>{
            username: request.body.username,
            password: request.body.password
        };

        return UserDao.login(param).then(item => {
            return item
        });

    }

    @Post('/logout')
    logout(request: Express.Request, response: Express.Response): ResponseData {


        return { success: true }
    }


    @Post('/getAll')
    async getAll(request: Express.Request, response: Express.Response): Promise<ResponseData> {
        return UserDao.getAll();
    }

    @Post('/delete')
    async delete(request: Express.Request, response: Express.Response): Promise<ResponseData> {

        let param = {
            id: request.body.id
        }
        if (param.id !== '' && 'id' in request.body) {
            return UserDao.delete(param);
        }
        return this.parametersError();

    }



    @Post('/add')
    async add(request: Express.Request, response: Express.Response): Promise<ResponseData> {

        let param = <UserInterface>{
            username: request.body.username,
            password: request.body.password,
            mark: request.body.mark || '',
            email: request.body.email || '',
            lastTime: ''
        };

        if (!param.username || !param.password) {
            return this.parametersError();
        }


        return UserDao.register(param);

    }



}
