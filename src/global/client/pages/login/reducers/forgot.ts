/// <reference path="../../../../../../typings/index.d.ts" />

import * as lodash from 'lodash';

import {
    IForgotMapping,

    FORM_UPDATE,
    FORM_RESET,
    FORGOT_RESPONSE

} from '../actions';

export function forgot(
    state: any = {
        email: '',
        success: false,
        loading: false,
        message: '',
        field: '',
        value: '',
        error: '',
        hasError: {
            email: false
        },
        help: {
            email: false
        },
    },
    action: IForgotMapping
): any {
    let delta: Object;
    switch (action.type) {
        case FORM_UPDATE:
            let obj: any = {};
            obj[action.field] = action.value;
            delta = lodash.assign({}, state, obj);
            return delta;
        case FORM_RESET:
            delta = lodash.assign({}, state, {

            });
            return delta;
        case FORGOT_RESPONSE:
            delta = lodash.assign({}, state, {
                message: action.message,
                success: action.success,
                loading: action.loading,
                help: action.help,
                hasError: action.hasError
            });
            return delta;
        default:
            return state;
    }
}
