
import { SqlHelper } from '../utils/db.util';
import { Time } from '../utils/time.util';
import { UserInterface } from '../services/login.service';
import { ResponseData } from '../code/index';
import { JsonStore } from '../utils/configStore.util';
enum Sqls {
    delete = 'delete from `USERINFO`  where id=? ',
    all = 'select * from `USERINFO`',
    hasName = 'select * from `USERINFO` where username = ?',
    login = 'select * from `USERINFO` where username = ? and password = ? ',
    register = 'insert into  `USERINFO` (username,password,email,lastTime,registerTime,mark) values (?,?,?,?,?,?)'
}


export class UserDao extends SqlHelper {


    /**
     * 登录
     *
     * @static
     * @param {*} data
     * @returns
     * @memberof LonginDao
     */
    static login(data: UserInterface): Promise<any> {

        return this.exec(Sqls.login, [data.username, data.password]);

    }

    static getAll() {
        return this.exec(Sqls.all);
    }


    static register(data: UserInterface): Promise<any> {

        let arr = [data.username, data.password, data.email, Time.getCurrentDate(), Time.getCurrentDate(), data.mark];

        return this.exec(Sqls.register, arr);
    }

    static delete(data: any): Promise<any> {
        return this.exec(Sqls.delete, [data.id]);
    }


}

