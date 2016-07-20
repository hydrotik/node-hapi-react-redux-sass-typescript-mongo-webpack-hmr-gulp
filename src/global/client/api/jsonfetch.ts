/// <reference path="../../../../typings/index.d.ts" />

import * as Xhr from 'xhr';
import * as Cookie from 'cookie';
import * as Qs from 'qs';
import {Promise} from 'es6-promise';

export interface IJSONFetch {
    url: string;
    method: string;
    data?: any;
    query?: any;
}

export default function jsonFetch(options: IJSONFetch, callback?: (error: Error, result?: string) => any): Promise<any> {
    
    return new Promise((resolve, reject) => { 
        let cookies: any = Cookie.parse(typeof(document)!== "undefined"? document.cookie: "");

        let config: any = {
            url: options.url,
            method: options.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        if (cookies.crumb) {
            config.headers['X-CSRF-Token'] = cookies.crumb;
        }

        if (options.query) {
            config.url += '?' + Qs.stringify(options.query);
        }

        if (options.data) {
            config.body = JSON.stringify(options.data);
        }

        // TODO Clean this up
        let x: any = Xhr;
        
            
        
        let cb: any = function(err: Error, response: any, body: any): void {

            if (err) {
                if (callback) {
                    callback(err);
                }
                
                reject({ err });
            } else if (response.statusCode >= 200 && response.statusCode < 300) {
                if (response.headers.hasOwnProperty('x-auth-required')) {
                    // RedirectActions.saveReturnUrl();
                    window.location.href = '/login';
                } else {
                    let data = JSON.parse(body);
                    if (callback) {
                        callback(null, data);
                    }
                    
                    resolve({ status: response.statusCode, data })
                }
            } else {
                let httpErr: Error = new Error(response.rawRequest.statusText);
                let data = JSON.parse(body);
                if (callback) {
                    callback(httpErr, data);
                }
                
                reject({err: httpErr, data});
            }
        };

        x(config, cb);
    });
}
