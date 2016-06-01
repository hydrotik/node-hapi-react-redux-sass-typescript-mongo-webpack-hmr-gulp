/// <reference path="../../../../../../typings/index.d.ts" />

import Fetch from '../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../api/parsevalidation';
// import fetch from 'isomorphic-fetch';

export const FORM_INIT: string = 'FORM_INIT';
export const FORM_UPDATE: string = 'FORM_UPDATE';
export const SEND_REQUEST: string = 'SEND_REQUEST';
export const RECEIVE_RESPONSE: string = 'RECEIVE_RESPONSE';

/* **************** Form Send Action Interface ****************** */
export interface IFormAbstract {
    type: string;
}

export interface IFormUpdate {
    type: string;
    field: string;
    value: string;
}

export interface IFormRequest extends IFormAbstract {
    name: string;
    username: string;
    password: string;
    email: string;
}

export interface IFormResponse extends IFormAbstract {
    success: boolean;
    errormessage: string;
    hasError: any;
    help: any;
    loading: boolean;
}

// TODO test using multiple inheritance: export interface IFormMapping extends IFormAbstract, IFormAbstract
export interface IFormMapping {
    type: string;
    success: boolean;
    errormessage: string;
    hasError: any;
    help: any;
    loading: boolean;
    name: string;
    username: string;
    password: string;
    email: string;
    field: string;
    value: string;
}

/* **************** Form Send Action Event ********************** */
export function onFormInit(): IFormAbstract {
    return {
        type: FORM_INIT
    };
}

/* **************** Form Send Action Event ********************** */
export function onFormUpdate(field: string, value: string): IFormUpdate {
    return {
        type: FORM_UPDATE,
        field,
        value
    };
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
export function onReceiveFormAction(success: boolean, errormessage: string, hasError: any, help: any, loading: boolean): IFormResponse {
    return {
        type: RECEIVE_RESPONSE,
        success: success,
        errormessage: errormessage,
        hasError: hasError,
        help: help,
        loading: loading
    };
}

export function handleRequest(data: any): any {
    return (dispatch: any, getState: any) => {
        dispatch(onSendFormAction(data.name, data.username, data.password, data.email));

        let request: any = {
            method: 'POST',
            url: '/api/signup',
            data: data
        };

        Fetch(request, (err: any, response: any) => {
            if (!err) {
                window.location.href = '/account';
                response.success = true;
            }

            let validation: IValidation = ParseValidation(response.validation, response.message);
            dispatch(onReceiveFormAction(response.success, validation.error, validation.hasError, validation.help, response.loading));
        });
    };
}
