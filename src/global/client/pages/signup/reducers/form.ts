/// <reference path="../../../../../../typings/main.d.ts" />

import * as lodash from 'lodash';

import {
    FORM_UPDATE,
    SEND_REQUEST,
    RECEIVE_RESPONSE,
    IFormMapping
} from '../actions';

export function formSignup(
    state: any = {
        name: '',
        username: '',
        password: '',
        email: '',
        success: false,
        hasError: {
        },
        help: {
        },
        loading: false,
        errormessage: '',
        field: '',
        value: ''
    },
    action: IFormMapping
): any {
    let delta: Object;
    switch (action.type) {
        case FORM_UPDATE:
            let obj: any = {};
            obj[action.field] = action.value;
            delta = lodash.assign({}, state, obj);
            return delta;
        case SEND_REQUEST:
            delta = lodash.assign({}, state, {
                name: action.name,
                username: action.username,
                password: action.password,
                email: action.email
            });
            return delta;
        case RECEIVE_RESPONSE:
            delta = lodash.assign({}, state, {
                success: action.success,
                errormessage: action.errormessage,
                hasError: action.hasError,
                help: action.help,
                loading: action.loading
            });
            return delta;
        default:
            return state;
    }
}
