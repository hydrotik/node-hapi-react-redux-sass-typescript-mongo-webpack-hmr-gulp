/// <reference path="../../../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';

import {
    SEND_REQUEST,
    RECEIVE_RESPONSE,
    IFormMapping
} from '../actions';

const initState: any = {
    success: false,
    hasError: {
        name: ''
    },
    help: {
        name: ''
    },
    loading: false,
    errormessage: ''
};

export function formSignup(state: any = initState, action: IFormMapping): any {
    let delta: Object;
    switch (action.type) {
        case SEND_REQUEST:
            delta = lodash.assign({}, state, {
                name: action.name,
                username: action.username,
                password: action.password,
                email: action.email
            });
            return delta;
        case RECEIVE_RESPONSE:
            console.warn('formSignup() :: state');
            console.warn(state);
            console.warn('formSignup() :: action.errormessage');
            console.warn(action.errormessage);

            delta = lodash.assign({}, state, {
                success: action.success,
                errormessage: action.errormessage,
                hasError: action.hasError,
                help: action.help,
                loading: action.loading
            });
            console.warn(delta);
            return delta;
        default:
            return state;
    }
}
