/// <reference path="../../../../../../typings/tsd.d.ts" />

import Fetch from '../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../api/parsevalidation';
// import fetch from 'isomorphic-fetch';

export const SEND_REQUEST: string = 'SEND_REQUEST';
export const RECEIVE_RESPONSE: string = 'RECEIVE_RESPONSE';

/* **************** Form Send Action Interface ****************** */
// start(callback: (startStatus: bool, engineType: string) => void) : void;
// http://stackoverflow.com/questions/17865620/typescript-multiple-inheritance-workarounds
export interface IFormAbstract {
    type: string;
}

export interface IFormRequest extends IFormAbstract {
    name: string;
    username: string;
    password: string;
    email: string;
}

export interface IFormResponse extends IFormAbstract {
    success: boolean;
    error: string;
    hasError: any;
    help: any;
    loading: boolean;
}

export interface IFormMapping extends IFormRequest, IFormResponse {
    // success?: boolean;
    // error?: boolean;
    // hasError?: any;
    // help?: any;
    // loading?: boolean;
    // name?: string;
    // username?: string;
    // password?: string;
    // email?: string;
}

/* **************** Form Send Action Event ********************** */
export function onSendFormAction(name: string, username: string, password: string, email: string): IFormRequest {
    return {
        type: SEND_REQUEST,
        name,
        username,
        password,
        email
    };
}

/* **************** Form Receive Action Event ********************** */
export function onReceiveFormAction(success: boolean, error: string, hasError: any, help: any, loading: boolean): IFormResponse {
    return {
        type: RECEIVE_RESPONSE,
        success,
        error,
        hasError,
        help,
        loading
    };
}

// TODO Interface for Data
export function handleRequest(data: any): any {
    return (dispatch: any, getState: any) => {
        dispatch(onSendFormAction(data.name, data.username, data.password, data.email));

        let request: any = {
            method: 'POST',
            url: '/api/signup',
            data: data
        };

        Fetch(request, function(err: any, response: any): void {
            if (!err) {
                window.location.href = '/account';
                response.success = true;
            }
            console.warn('request reponse:');
            console.warn(response);
            console.warn(err);

            let validation: IValidation = ParseValidation(response.validation, response.message);

            dispatch(onReceiveFormAction(response.success, validation.error, validation.hasError, validation.help, response.loading));
        });
    };
}
