/// <reference path="../../../../../../typings/main.d.ts" />

import * as lodash from 'lodash';

import {
    IResetMapping,

    FORM_UPDATE,
    FORM_RESET,
    RESET_RESPONSE

} from '../actions';

export function reset(
    state: any = {
        email: '',
        success: false,
        loading: false,
        message: '',
        field: '',
        value: '',
        error: '',
        hasError: {
            password: false,
            email: false,
            key: false
        },
        help: {
            password: false,
            email: false,
            key: false
        },
    },
    action: IResetMapping
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
        case RESET_RESPONSE:
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
