/// <reference path="../../../../../../typings/tsd.d.ts" />

import Fetch from '../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../api/parsevalidation';

export const FORM_INIT: string = 'FORM_INIT';
export const FORM_RESET: string = 'FORM_RESET';
export const FORM_UPDATE: string = 'FORM_UPDATE';

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
    data: any;
}

export interface ILoginResponse extends ILoginAbstract {
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

export interface IUserResponse extends ILoginAbstract {
    response?: any;
    username?: string;
    email?: string;
    usersuccess?: boolean;
    errormessage?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

export interface IPasswordResponse extends ILoginAbstract {
    response?: any;
    passwordsuccess?: boolean;
    errormessage?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

// TODO test using multiple inheritance: export interface ILoginMapping extends ILoginAbstract, ILoginAbstract
export interface ILoginMapping {
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

/* **************** Form Send Action Event ********************** */
export function onViewAction(type: string, data?: any): ILoginRequest {
    return {
        type,
        data
    };
}
