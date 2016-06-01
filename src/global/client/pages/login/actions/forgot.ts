/// <reference path="../../../../../../typings/index.d.ts" />

import Fetch from '../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../api/parsevalidation';

export const FORGOT_REQUEST: string = 'FORGOT_REQUEST';
export const FORGOT_RESPONSE: string = 'FORGOT_RESPONSE';

/* **************** Form Send Action Interface ****************** */
export interface IForgotAbstract {
    type: string;
}

export interface IForgotUpdate {
    type: string;
    field: string;
    value: string;
}

export interface IForgotRequest extends IForgotAbstract {
    email?: string;
}

export interface IForgotResponse extends IForgotAbstract {
    response?: any;
    success?: boolean;
    message?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

// TODO test using multiple inheritance: export interface IForgotMapping extends IForgotAbstract, IForgotAbstract
export interface IForgotMapping {
    type: string;
    success?: boolean;
    error?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
    field?: string;
    value?: string;
    message?: string;
    email?: string;
}

export function onForgotRequest(): IForgotRequest {
    return {
        type: FORGOT_REQUEST
    };
}

export function onForgotResponse(
    response: any,
    message: string,
    hasError: any,
    help: any,
    success: boolean,
    loading: boolean
): IForgotResponse {
    return {
        type: FORGOT_RESPONSE,
        response,
        message,
        hasError,
        help,
        success,
        loading
    };
}


export function doForgot(data: any): any {
    return (dispatch: any, getState: any) => {

        dispatch(onForgotRequest());

        let request: any = {
            method: 'POST',
            url: '/api/login/forgot',
            data: data
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            }

            let validation: IValidation = ParseValidation(response.validation, response.message);

            // dispatch(SERVER_ACTION, Types.FORGOT_RESPONSE, response);
            dispatch(
                onForgotResponse(
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
