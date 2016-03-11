/// <reference path="../../../../../../typings/tsd.d.ts" />

import Fetch from '../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../api/parsevalidation';

export const RESET_REQUEST: string = 'RESET_REQUEST';
export const RESET_RESPONSE: string = 'RESET_RESPONSE';

/* **************** Form Send Action Interface ****************** */
export interface IResetAbstract {
    type: string;
}

export interface IResetUpdate {
    type: string;
    field: string;
    value: string;
}

export interface IResetRequest extends IResetAbstract {
    username?: string;
    password?: string;
}

export interface IResetResponse extends IResetAbstract {
    response?: any;
    success?: boolean;
    message?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

// TODO test using multiple inheritance: export interface IResetMapping extends IResetAbstract, IResetAbstract
export interface IResetMapping {
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

export function onResetRequest(): IResetRequest {
    return {
        type: RESET_REQUEST
    };
}

export function onResetResponse(
    response: any,
    message: string,
    hasError: any,
    help: any,
    success: boolean,
    loading: boolean
): IResetResponse {
    return {
        type: RESET_RESPONSE,
        response,
        message,
        hasError,
        help,
        success,
        loading
    };
}


export function login(data: any): any {
    return (dispatch: any, getState: any) => {

        dispatch(onResetRequest());

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

            // dispatch(SERVER_ACTION, Types.RESET_RESPONSE, response);
            dispatch(
                onResetResponse(
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
