/// <reference path="../../../../../../typings/tsd.d.ts" />

import Fetch from '../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../api/parsevalidation';

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
    response?: any;
    nameFirst?: string;
    nameMiddle?: string;
    nameLast?: string;
    accountsuccess?: boolean;
    errormessage?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

export interface IUserResponse extends IAccountAbstract {
    response?: any;
    username?: string;
    email?: string;
    usersuccess?: boolean;
    errormessage?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

export interface IPasswordResponse extends IAccountAbstract {
    response?: any;
    passwordsuccess?: boolean;
    errormessage?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

// TODO test using multiple inheritance: export interface IAccountMapping extends IAccountAbstract, IAccountAbstract
export interface IAccountMapping {
    type: string;
    accountsuccess?: boolean;
    passwordsuccess?: boolean;
    usersuccess?: boolean;
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
    userhydrated?: boolean;
    accounthydrated?: boolean;
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

        Fetch(request, (err: any, response: any) => {
            dispatch(onGetAccountSettingsAction(response.name.first, response.name.middle, response.name.last));
        });
    };
}

/* **************** Form Send Action Event ********************** */
export function onSaveAccountSettingsAction(
    response: any,
    errormessage: string,
    hasError: any,
    help: any,
    accountsuccess: boolean,
    loading: boolean
): IAccountResponse {
    return {
        type: SAVE_ACCOUNT_SETTINGS_RESPONSE,
        response,
        errormessage,
        hasError,
        help,
        accountsuccess,
        loading
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

        console.warn('saveAccountSettings()');
        console.warn(data);

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            }
            console.warn('saveAccountSettings() :: response:');
            console.warn(response);

            let validation: IValidation = ParseValidation(response.validation, response.message);

            // dispatch(onReceiveFormAction(response.success, validation.error, validation.hasError, validation.help, response.loading));
            dispatch(
                onSaveAccountSettingsAction(
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

/* **************** Form Send Action Event ********************** */
export function onGetUserSettingsAction(username?: string, email?: string): IUserResponse {
    return {
        type: GET_USER_SETTINGS_RESPONSE,
        username,
        email
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
            dispatch(onGetUserSettingsAction(response.username, response.email));
        });
    };
}

/* **************** Form Send Action Event ********************** */
export function onSaveUserSettingsAction(
    response: any,
    errormessage: string,
    hasError: any,
    help: any,
    usersuccess: boolean,
    loading: boolean
): IUserResponse {
    return {
        type: SAVE_USER_SETTINGS_RESPONSE,
        response,
        errormessage,
        hasError,
        help,
        usersuccess,
        loading
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

        console.warn('saveUserSettings()');
        console.warn(data);

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            }

            console.warn('saveUserSettings() :: response:');
            console.warn(response);

            let validation: IValidation = ParseValidation(response.validation, response.message);

            dispatch(
                onSaveUserSettingsAction(
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

/* **************** Form Send Action Event ********************** */
export function onSavePasswordSettingsAction(
    response: any,
    errormessage: string,
    hasError: any,
    help: any,
    passwordsuccess: boolean,
    loading: boolean
): IPasswordResponse {
    return {
        type: SAVE_PASSWORD_SETTINGS_RESPONSE,
        response,
        errormessage,
        hasError,
        help,
        passwordsuccess,
        loading
    };
}

export function savePasswordSettings(data: any): any {

    let validation: IValidation;

    return (dispatch: any, getState: any) => {
        dispatch(onViewAction(SAVE_PASSWORD_SETTINGS, data));

        if (data.password !== data.passwordConfirm) {

            let r: any = {
                response: {},
                message: 'Passwords do not match.',
                validation: {
                    keys : [
                        'passwordConfirm'
                    ]
                },
                passwordsuccess: false,
                loading: false
            };

            validation = ParseValidation(r.validation, r.message);

            dispatch(onSavePasswordSettingsAction(
                r,
                validation.error,
                validation.hasError,
                validation.help,
                r.success,
                r.loading
            ));

            return;
        }

        delete data.passwordConfirm;

        let request: any = {
            method: 'PUT',
            url: '/api/users/my/password',
            data: data,
            useAuth: true
        };

        console.warn('savePasswordSettings()');
        console.warn(data);

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            }

            console.warn('savePasswordSettings() :: response:');
            console.warn(response);

            validation = ParseValidation(response.validation, response.message);

            dispatch(
                onSavePasswordSettingsAction(
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
