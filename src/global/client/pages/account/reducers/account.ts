/// <reference path="../../../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';

import {
    FORM_UPDATE,
    FORM_RESET,
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

export function account(
    state: any = {
        name: '',
        username: '',
        password: '',
        email: '',
        accountsuccess: false,
        usersuccess: false,
        passwordsuccess: false,
        hasError: {
            username: false,
            email: false,
            nameFirst: false,
            nameMiddle: false,
            nameLast: false,
            password: false,
            passwordConfirm: false
        },
        help: {
            username: false,
            email: false,
            nameFirst: false,
            nameMiddle: false,
            nameLast: false,
            password: false,
            passwordConfirm: false
        },
        loading: false,
        errormessage: '',
        field: '',
        value: '',

        error: false,

        nameFirst: '',
        nameMiddle: '',
        nameLast: '',

        passwordConfirm: '',

        accounthydrated: false,
        userhydrated: false
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
        case FORM_RESET:
            delta = lodash.assign({}, state, {
                accountsuccess: false,
                usersuccess: false,
                passwordsuccess: false,
                hasError: {
                    username: false,
                    email: false,
                    nameFirst: false,
                    nameMiddle: false,
                    nameLast: false,
                    password: false,
                    passwordConfirm: false
                },
                help: {
                    username: false,
                    email: false,
                    nameFirst: false,
                    nameMiddle: false,
                    nameLast: false,
                    password: false,
                    passwordConfirm: false
                },
                loading: false,
                errormessage: '',
                error: false,
                accounthydrated: false,
                userhydrated: false
            });
            return delta;
        case GET_ACCOUNT_SETTINGS:
            delta = lodash.assign({}, state, {
                accounthydrated: false
            });
            return delta;
        case GET_ACCOUNT_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
                nameFirst: action.nameFirst,
                nameMiddle: action.nameMiddle,
                nameLast: action.nameLast,
                accounthydrated: true
            });
            return delta;
        case SAVE_ACCOUNT_SETTINGS:
            delta = lodash.assign({}, state, {
                accountsuccess: action.accountsuccess,
                errormessage: action.errormessage,
                hasError: action.hasError,
                help: action.help,
                loading: action.loading
            });
            return delta;
        case SAVE_ACCOUNT_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
                accountsuccess: action.accountsuccess,
                errormessage: action.errormessage,
                hasError: action.hasError,
                help: action.help,
                loading: action.loading
            });
            return delta;
        case GET_USER_SETTINGS:
            delta = lodash.assign({}, state, {
                userhydrated: false
            });
            return delta;
        case GET_USER_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
                username: action.username,
                email: action.email,
                userhydrated: true
            });
            return delta;
        case SAVE_USER_SETTINGS:
            delta = lodash.assign({}, state, {
                usersuccess: action.usersuccess,
                errormessage: action.errormessage,
                hasError: action.hasError,
                help: action.help,
                loading: action.loading
            });
            return delta;
        case SAVE_USER_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
                usersuccess: action.usersuccess,
                errormessage: action.errormessage,
                hasError: action.hasError,
                help: action.help,
                loading: action.loading
            });
            return delta;
        case SAVE_PASSWORD_SETTINGS:
            delta = lodash.assign({}, state, {
                passwordsuccess: action.passwordsuccess,
                errormessage: action.errormessage,
                hasError: action.hasError,
                help: action.help,
                loading: action.loading
            });
            return delta;
        case SAVE_PASSWORD_SETTINGS_RESPONSE:
            delta = lodash.assign({}, state, {
                passwordsuccess: action.passwordsuccess,
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
