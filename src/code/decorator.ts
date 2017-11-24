
import * as Express from 'express';

import { Defer } from '../utils/promise.util';
import { ResponseData } from './index';


enum HttpServletType {
    View = 'view',
    Post = 'post',
    Get = 'get'
}

interface HttpServlet {
    type: string;
    url: string;
    render: string;
    action: Function;
}


let controllerSymbol = Symbol('controller');

let Router: HttpServlet[] = [];

export const Setting = <any>{

}

export function Controller(name: string) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        let controller = constructor.prototype[controllerSymbol];
        if (controller) {

            controller.forEach((item: HttpServlet, index: number) => {
                item.url = name + item.url;
                Router.push(item);
            });

            delete constructor.prototype[controllerSymbol];
        }

        return class extends constructor {
        }
    }

}


function action(type: string, url: string, action: Function, target: any, render?: string) {

    if (!target[controllerSymbol]) {
        target[controllerSymbol] = [];
    }
    target[controllerSymbol].push(<HttpServlet>{
        type: type,
        url: url,
        render: render,
        action: action
    })

}


function pathVerification(type: string, path: string, render?: string): Function {

    // if (!path) {
    //     return () => { };
    // }

    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        action(type, path, descriptor.value, target, render);
    };
}


export function ServerSettings(setting: any) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
        }
    }
}




export function View(path: string, render: string) {
    return pathVerification(HttpServletType.View, path, render);
}


export function Post(path: string) {
    return pathVerification(HttpServletType.Post, path);
}


export function Get(path: string) {
    return pathVerification(HttpServletType.Get, path);
}

export function Register(app: any) {

    Router.forEach(router => {
        switch (router.type) {

            case HttpServletType.Get:

                app.get(router.url, (request: Express.Request, response: Express.Response) => {
                    debugger;
                    let data = router.action(request, response);
                    response.send(data);
                })

                break;

            case HttpServletType.Post:

                app.post(router.url, (request: Express.Request, response: Express.Response) => {
                    let data = router.action(request, response);
                    response.send(data);
                })

                break;

            case HttpServletType.View:

                app.get(router.url, (request: Express.Request, response: Express.Response) => {

                    let data = router.action(request, response);

                    response.render(router.render, data, (err, html) => {
                        if (err) {
                            response.send(<ResponseData>{
                                success: false,
                                info: err
                            })
                        }
                        response.send(html);
                    });
                })

            default:
            //

        }
    })
}


// @Controller('xxx')
// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//         console.log(111);
//     }

//     @Get('/getAll')
//     async postAll() {
//         console.log('get...');
//     }

//     @Post('/getAll')
//     getAll() {
//         console.log('post..');
//     }
// }





// console.log(Router);
// debugger;
