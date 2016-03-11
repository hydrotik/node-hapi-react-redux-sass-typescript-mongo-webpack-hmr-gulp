/// <reference path="../../../../../../typings/tsd.d.ts" />

import Fetch from '../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../api/parsevalidation';

export const FORM_INIT: string = 'FORM_INIT';
export const FORM_RESET: string = 'FORM_RESET';
export const FORM_UPDATE: string = 'FORM_UPDATE';
export const LOGIN_REQUEST: string = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE: string = 'LOGIN_RESPONSE';
export const LOGOUT_REQUEST: string = 'LOGOUT_REQUEST';
export const LOGOUT_RESPONSE: string = 'LOGOUT_RESPONSE';

/* **************** Form Send Action Interface ****************** */
export interface ILoginAbstract {
    type: string;
}

export interface ILoginUpdate {
    type: string;
    field: string;
    value: string;
}

export interface ILoginRequest extends ILoginAbstract {
    username?: string;
    password?: string;
}

export interface ILoginResponse extends ILoginAbstract {
    response?: any;
    success?: boolean;
    message?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

// TODO test using multiple inheritance: export interface ILoginMapping extends ILoginAbstract, ILoginAbstract
export interface ILoginMapping {
    type: string;
    success?: boolean;
    error?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
    username?: string;
    password?: string;
    field?: string;
    value?: string;
    message?: string;
    email?: string;
}

/* **************** Form Send Action Event ********************** */
export function onFormInit(): ILoginAbstract {
    return {
        type: FORM_INIT
    };
}

/* **************** Form Send Action Event ********************** */
export function onFormReset(): ILoginMapping {
    return {
        type: FORM_RESET
    };
}

/* **************** Form Send Action Event ********************** */
export function onFormUpdate(field: string, value: string): ILoginUpdate {
    return {
        type: FORM_UPDATE,
        field,
        value
    };
}

export function onLoginRequest(): ILoginRequest {
    return {
        type: LOGIN_REQUEST
    };
}

export function onLoginResponse(
    response: any,
    message: string,
    hasError: any,
    help: any,
    success: boolean,
    loading: boolean
): ILoginResponse {
    return {
        type: LOGIN_RESPONSE,
        response,
        message,
        hasError,
        help,
        success,
        loading
    };
}


export function doLogin(data: any): any {
    return (dispatch: any, getState: any) => {

        dispatch(onLoginRequest());

        let request: any = {
            method: 'POST',
            url: '/api/login',
            data: data
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                let returnUrl: any = window.localStorage.getItem('returnUrl');

                if (returnUrl) {
                    // RedirectActions.clearReturnUrl();
                    window.location.href = returnUrl;
                } else if (response.user.roles.admin) {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/account';
                }

                response.success = true;
            }

            let validation: IValidation = ParseValidation(response.validation, response.message);

            // dispatch(SERVER_ACTION, Types.LOGIN_RESPONSE, response);
            dispatch(
                onLoginResponse(
                    response,
                    validation.error,
                    validation.hasError,
                    validation.help,
                    response.success,
                    response.loading
                )
            );
        });
    };
}


export function onLogoutRequest(): ILoginRequest {
    return {
        type: LOGOUT_REQUEST
    };
}

export function onLogoutResponse(
    response: any,
    message: string,
    hasError: any,
    help: any,
    success: boolean,
    loading: boolean
): ILoginResponse {
    return {
        type: LOGOUT_RESPONSE,
        response,
        message,
        hasError,
        help,
        success,
        loading
    };
}

export function doLogout(data: any): any {
    return (dispatch: any, getState: any) => {

        dispatch(onLoginRequest());

        let request: any = {
            method: 'DELETE',
            url: '/api/logout',
            data: data,
            useAuth: true
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            } else {
                response.error = err.message;
            }

            // dispatch(SERVER_ACTION, Types.LOGIN_RESPONSE, response);
            dispatch(
                onLoginResponse(
                    response,
                    response.error,
                    response.hasError,
                    response.help,
                    response.success,
                    response.loading
                )
            );
        });
    };
}

