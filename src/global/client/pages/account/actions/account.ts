/// <reference path="../../../../../../typings/tsd.d.ts" />

import Fetch from '../../../api/jsonfetch';
// import ParseValidation, { IValidation } from '../../../api/parsevalidation';

export const FORM_INIT: string = 'FORM_INIT';
export const FORM_UPDATE: string = 'FORM_UPDATE';
export const GET_ACCOUNT_SETTINGS: string = 'GET_ACCOUNT_SETTINGS';
export const GET_ACCOUNT_SETTINGS_RESPONSE: string = 'GET_ACCOUNT_SETTINGS_RESPONSE';
export const SAVE_ACCOUNT_SETTINGS: string = 'SAVE_ACCOUNT_SETTINGS';
export const SAVE_ACCOUNT_SETTINGS_RESPONSE: string = 'SAVE_ACCOUNT_SETTINGS_RESPONSE';
export const GET_USER_SETTINGS: string = 'GET_USER_SETTINGS';
export const GET_USER_SETTINGS_RESPONSE: string = 'GET_USER_SETTINGS_RESPONSE';
export const SAVE_USER_SETTINGS: string = 'SAVE_USER_SETTINGS';
export const SAVE_USER_SETTINGS_RESPONSE: string = 'SAVE_USER_SETTINGS_RESPONSE';
export const SAVE_PASSWORD_SETTINGS: string = 'SAVE_PASSWORD_SETTINGS';
export const SAVE_PASSWORD_SETTINGS_RESPONSE: string = 'SAVE_PASSWORD_SETTINGS_RESPONSE';

export const SEND_MESSAGE: string = 'SEND_MESSAGE';
export const SEND_MESSAGE_RESPONSE: string = 'SEND_MESSAGE_RESPONSE';

/* **************** Form Send Action Interface ****************** */
export interface IAccountAbstract {
    type: string;
}

export interface IAccountUpdate {
    type: string;
    field: string;
    value: string;
}

export interface IAccountRequest extends IAccountAbstract {
    data: any;
}

export interface IAccountResponse extends IAccountAbstract {
    nameFirst: string;
    nameMiddle: string;
    nameLast: string;
    /*
    success: boolean;
    errormessage: string;
    hasError: any;
    help: any;
    loading: boolean;
    */
}

export interface IUserResponse extends IAccountAbstract {
    response: any;
    /*
    success: boolean;
    errormessage: string;
    hasError: any;
    help: any;
    loading: boolean;
    */
}

// TODO test using multiple inheritance: export interface IAccountMapping extends IAccountAbstract, IAccountAbstract
export interface IAccountMapping {
    type: string;
    success?: boolean;
    errormessage?: string;
    error?: boolean;
    hasError?: any;
    help?: any;
    loading?: boolean;
    name?: any;
    nameFirst?: string;
    nameMiddle?: string;
    nameLast?: string;
    username?: string;
    password?: string;
    passwordConfirm?: string;
    email?: string;
    field?: string;
    value?: string;
    hydrated?: boolean;
}

/*
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
*/

/* **************** Form Send Action Event ********************** */
export function onFormInit(): IAccountAbstract {
    return {
        type: FORM_INIT
    };
}

/* **************** Form Send Action Event ********************** */
export function onFormUpdate(field: string, value: string): IAccountUpdate {
    return {
        type: FORM_UPDATE,
        field,
        value
    };
}

/* **************** Form Send Action Event ********************** */
export function onViewAction(type: string, data?: any): IAccountRequest {
    return {
        type,
        data
    };
}



/* **************** Form Send Action Event ********************** */
export function onGetAccountSettingsAction(nameFirst: string, nameMiddle: string, nameLast: string): IAccountResponse {
    return {
        type: GET_ACCOUNT_SETTINGS_RESPONSE,
        nameFirst,
        nameMiddle,
        nameLast
    };
}

export function getAccountSettings(data?: any): any {
    return (dispatch: any, getState: any) => {
        dispatch(onViewAction(GET_ACCOUNT_SETTINGS, data));

        let request: any = {
            method: 'GET',
            url: '/api/accounts/my',
            data: data,
            useAuth: true
        };

        console.warn('getAccountSettings()');

        Fetch(request, (err: any, response: any) => {

            // dispatch(SERVER_ACTION, Types.GET_ACCOUNT_SETTINGS_RESPONSE, response);

            console.warn('getAccountSettings() :: response');
            console.warn(err);
            console.warn(response);
            dispatch(onGetAccountSettingsAction(response.name.first, response.name.middle, response.name.last));
        });
    };
}

/* **************** Form Send Action Event ********************** */
export function onSaveAccountSettingsAction(response: any): IUserResponse {
    return {
        type: SAVE_ACCOUNT_SETTINGS_RESPONSE,
        response
    };
}

export function saveAccountSettings(data: any): any {
    return (dispatch: any, getState: any) => {
        dispatch(onViewAction(SAVE_ACCOUNT_SETTINGS, data));

        let request: any = {
            method: 'PUT',
            url: '/api/accounts/my',
            data: data,
            useAuth: true
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            }

            // dispatch(SERVER_ACTION, Types.SAVE_ACCOUNT_SETTINGS_RESPONSE, response);

            dispatch(onSaveAccountSettingsAction(response));
        });
    };
}

/* **************** Form Send Action Event ********************** */
export function onGetUserSettingsAction(response: any): IUserResponse {
    return {
        type: GET_USER_SETTINGS_RESPONSE,
        response
    };
}

export function getUserSettings(data?: any): any {
    return (dispatch: any, getState: any) => {
        dispatch(onViewAction(GET_USER_SETTINGS, data));

        let request: any = {
            method: 'GET',
            url: '/api/users/my',
            data: data,
            useAuth: true
        };

        Fetch(request, (err: any, response: any) => {

            // dispatch(SERVER_ACTION, Types.GET_USER_SETTINGS_RESPONSE, response);

            dispatch(onGetUserSettingsAction(response));
        });
    };
}

/* **************** Form Send Action Event ********************** */
export function onSaveUserSettingsAction(response: any): IUserResponse {
    return {
        type: SAVE_USER_SETTINGS_RESPONSE,
        response
    };
}

export function saveUserSettings(data: any): any {
    return (dispatch: any, getState: any) => {
        dispatch(onViewAction(SAVE_USER_SETTINGS, data));

        let request: any = {
            method: 'PUT',
            url: '/api/users/my',
            data: data,
            useAuth: true
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            }

            // dispatch(SERVER_ACTION, Types.SAVE_USER_SETTINGS_RESPONSE, response);

            dispatch(onSaveUserSettingsAction(response));
        });
    };
}

/* **************** Form Send Action Event ********************** */
export function onSavePasswordSettingsAction(response: any): IUserResponse {
    return {
        type: SAVE_PASSWORD_SETTINGS_RESPONSE,
        response
    };
}

export function savePasswordSettings(data: any): any {
    return (dispatch: any, getState: any) => {
        dispatch(onViewAction(SAVE_PASSWORD_SETTINGS, data));

        if (data.password !== data.passwordConfirm) {
            /*
            dispatch(VIEW_ACTION, Types.SAVE_PASSWORD_SETTINGS_RESPONSE, {
                message: 'Passwords do not match.'
            });
            */

            dispatch(onSavePasswordSettingsAction({
                message: 'Passwords do not match.'
            }));

            return;
        }

        delete data.passwordConfirm;

        let request: any = {
            method: 'PUT',
            url: '/api/users/my/password',
            data: data,
            useAuth: true
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            }

            // dispatch(SERVER_ACTION, Types.SAVE_PASSWORD_SETTINGS_RESPONSE, response);

            dispatch(onSavePasswordSettingsAction(response));
        });
    };
}
