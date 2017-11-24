


/**
 * 时间工具类
 *
 * @class Time
 */
export class Time {

    static getDate() {
        let date = new Date();
        let y = date.getFullYear();
        let m: any = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d: any = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h: any = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute: any = date.getMinutes();
        let second: any = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }


    static getCurrentDate(): string {

        let now = new Date();

        return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

    }

}

