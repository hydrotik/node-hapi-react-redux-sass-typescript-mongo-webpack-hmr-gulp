/// <reference path="../../../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';

import {
    ILoginMapping,

    FORM_UPDATE,
    FORM_RESET,
    LOGIN_RESPONSE

} from '../actions';

export function login(
    state: any = {
        username: '',
        password: '',
        success: false,
        loading: false,
        message: '',
        field: '',
        value: '',
        error: '',
        hasError: {
            username: false,
            password: false
        },
        help: {
            username: false,
            password: false
        },
    },
    action: ILoginMapping
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
        case LOGIN_RESPONSE:
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
