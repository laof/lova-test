
import * as cheerio from 'cheerio';
import * as http from 'http';
import * as request from 'request';
import * as fs from 'fs';
import * as path from 'path';
import * as phantom from 'phantom';
import { Guid } from '../utils/string.util';


declare let $: any;
declare let window: any;


console.log('检查配置..');
const config = {
    saveDir: 'd:/file/',

    document: {
        host: 'http://www.la5.com/',
        subPageURL: 'http://www.la5.com/thread-htm-fid-5-page-2.html',
    },

    XMLHttpRequest: {
        host: 'https://music.163.com/',
        subPageURL: 'https://music.163.com/#/song?id=169185',
        url: 'https://music.163.com/weapi/song/enhance/player/url?csrf_token=',
        includeJs: [
            'https://cdn.bootcss.com/jquery/1.10.0/jquery.min.js'
        ],
        type: 'post',
        data: {
            params: '9tGFuWQZofQhlr0WU7RS9r1e2e2nSxKT8zEoZGxk9qwcSp8Rn51dgRwNIrOz7GNpPa/HVT7DTXtEgNh2S300eY38caQz/ffIl2lj05Z2Sbo=',
            encSecKey: 'd82c8701b132874a806a086739b304a5d78ba2e014e0268026c64243466f7e29ea15440d11b9575dbeb590baf7036f5d349d49e47d36d8dd2640e313fc7240b5adfec611f12eb970fa892ee9ad6b35fd3299bde281ddb26fae49c77ce891545877f5d86683998d2dadbaeab207a3b864f41ac1dcd1ee3a82069d4fce6dd91c93'
        },
        parse(data) {
            const res = JSON.parse(data);
            return res.data[0].url;
        }
    }
}



class CrawleWidget {

    constructor() {
        this.runXMLHttpRequest();
        this.runDocument();
    }

    async runXMLHttpRequest() {
        const res = await this.getResourcesByAjax(config.XMLHttpRequest.subPageURL);
        const file = config.saveDir + Guid.S4() + '.mp3';
        this.downLoadFile(config.XMLHttpRequest.parse(res), file);
        console.log('下载' + file);
    }

    async runDocument() {
        console.log(1222);
        this.getResourcesByElement(config.document.subPageURL);
    }


    downLoadFile(url, savePath, callback = () => { }) {
        const stream = fs.createWriteStream(savePath);
        request(url, (err, res, body) => {

        }).pipe(stream).on('close', callback);
    }



    async getResourcesByAjax(pageurl) {

        const instance = await phantom.create();
        const page = await instance.createPage();
        const open = await page.open(pageurl);

        const exit = () => { instance.exit(); }

        for (let i = 0, js = config.XMLHttpRequest.includeJs; i < js.length; i++) {
            await page.includeJs(js[i]);
        }


        const configString = JSON.stringify(config);

        await page.evaluateJavaScript(`function() { return window.lova_json=${configString}; }`).catch(exit);

        const res = await page.evaluate(function () {
            var resData = 'defulat';
            var config = window.lova_json;

            if (!config) { return };

            $.ajax({
                url: config.XMLHttpRequest.url,
                type: config.XMLHttpRequest.type,
                async: false,
                data: config.XMLHttpRequest.data,
                success: function (data) {
                    resData = data;
                }, error: function () {
                    resData = 'clinet error';
                }
            })
            return resData;
        }).catch(exit);

        exit();
        return res;
    }

    getNameByPath(pathname) {
        const str: any = (pathname + '').replace(/\//g, '-').split('.');
        const endName = str[str.length - 1];
        let qqq: any = '.';
        if (str.length > 30) {
            qqq += str.substring(0, 30);
        } else {
            qqq += endName;
        }
        return qqq;
    }

    getResourcesByElement(url) {

        const promise = new Promise((resolve, reject) => {
            const options = {
                url: url,
                method: 'post',
                encoding: 'utf-8'
            }
            request(options, (err, res, body) => {
                if (err) {
                    reject(err);
                } else if (res.statusCode === 200) {
                    resolve(body);
                }
            });
        })

        promise.then(data => {
            const list = [];
            const resources = [];
            const $ = cheerio.load(data);

            $('#ajaxtable .subject').each((i, v) => {
                list.push($(v).attr('href'));
            })

            // 第一页列表
            if (list.length) {
                list.forEach((v, i) => {
                    this.getResourcesByElement(config.document.host + v);
                })
            } else {
                // 第二页资源
                const href = $('div[style="margin:0 10px 10px 15px;"] a').attr('href');
                if (href) {
                    const url = config.document.host + href;
                    console.log('下载：' + url);
                    const filename = Guid.S4() + '.torrent';
                    this.downLoadFile(url, config.saveDir + filename);
                }
            }

        }, error => {
            console.log(error.error);
        })

    }
}

