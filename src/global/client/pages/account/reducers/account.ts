/// <reference path="../../../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';

import {
    FORM_UPDATE,
    GET_ACCOUNT_SETTINGS,
    GET_ACCOUNT_SETTINGS_RESPONSE,
    SAVE_ACCOUNT_SETTINGS,
    SAVE_ACCOUNT_SETTINGS_RESPONSE,
    GET_USER_SETTINGS,
    GET_USER_SETTINGS_RESPONSE,
    SAVE_USER_SETTINGS,
    SAVE_USER_SETTINGS_RESPONSE,
    SAVE_PASSWORD_SETTINGS,
    SAVE_PASSWORD_SETTINGS_RESPONSE,
    IAccountMapping
} from '../actions';

export function accountRequest(
    state: any = {
    },
    action: IAccountMapping
): any {
    let delta: Object;
    switch (action.type) {
        case FORM_UPDATE:
            let obj: any = {};
            obj[action.field] = action.value;
            delta = lodash.assign({}, state, obj);
            return delta;
        case GET_ACCOUNT_SETTINGS:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case GET_ACCOUNT_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case SAVE_ACCOUNT_SETTINGS:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case SAVE_ACCOUNT_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case GET_USER_SETTINGS:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case GET_USER_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case SAVE_USER_SETTINGS:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case SAVE_USER_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case SAVE_PASSWORD_SETTINGS:
            delta = lodash.assign({}, state, {
            });
            return delta;
        case SAVE_PASSWORD_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
            });
            return delta;
        default:
            return state;
    }
}
