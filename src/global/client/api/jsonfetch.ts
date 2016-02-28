/// <reference path="../../../../typings/tsd.d.ts" />

import * as Xhr from 'xhr';
import * as Cookie from 'cookie';
import * as Qs from 'qs';

export interface IJSONFetch {
    url: string;
    method: string;
    // Link to Data Interface
    data?: any;
    query?: any;
}

export default function jsonFetch(options: IJSONFetch, callback: (error: Error, result?: string) => any): void {

    let cookies: any = Cookie.parse(document.cookie);

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

    console.log(config);

    let x: any = Xhr;

    let cb: any = function(err: Error, response: any, body: any): void {

        if (err) {
            callback(err);
        } else if (response.statusCode >= 200 && response.statusCode < 300) {
            if (response.headers.hasOwnProperty('x-auth-required')) {
                // RedirectActions.saveReturnUrl();
                window.location.href = '/login';
            } else {
                callback(null, JSON.parse(body));
            }
        } else {
            let httpErr: Error = new Error(response.rawRequest.statusText);
            callback(httpErr, JSON.parse(body));
        }
    };

    x(config.url, config, cb);

    // let o: string = JSON.stringify(options.data);

    // callback(null, JSON.parse(o));
}
