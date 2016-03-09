/// <reference path="../../../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';

import {
    ILoginMapping,

    FORM_UPDATE,
    FORM_RESET,

} from '../actions';

export function account(
    state: any = {
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
        default:
            return state;
    }
}
