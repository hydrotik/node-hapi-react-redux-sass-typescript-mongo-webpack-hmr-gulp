/// <reference path="../../../../typings/index.d.ts" />

import * as Xhr from 'xhr';
import * as Cookie from 'cookie';
import * as Qs from 'qs';
import {Promise} from 'es6-promise';
import * as fetch from 'isomorphic-fetch';


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

            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            method: options.method,
            url: options.url,
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
        let x: any = fetch;
        
            
        
        let cb: any = function(err: Error, response: any, body: any): void {

            if (err) {
                if (callback) {
                    callback(err);
                }
                
                reject({ err });
            } else if (response.status >= 200 && response.status < 300) {
                if (response.headers.hasOwnProperty('x-auth-required')) {
                    // RedirectActions.saveReturnUrl();
                    window.location.href = '/login';
                } else {
                    let data = body;
                    if (callback) {
                        callback(null, data);
                    }
                    
                    resolve({ status: response.status, data })
                }
            } else {
                let httpErr: Error = new Error(response.statusText);
                if (callback) {
                    callback(httpErr);
                }
                
                reject({err: httpErr});
            }
        };

        var p:any = x(config.url, config);

        p.then((response) => { 
            return response.json()
            .then((data) => { cb(undefined, response, data); });
        })
        
        .catch((err) => { cb(err); });
    });
}
