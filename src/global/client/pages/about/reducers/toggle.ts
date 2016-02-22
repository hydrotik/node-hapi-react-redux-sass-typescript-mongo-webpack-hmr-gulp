/// <reference path="../../../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';
import {

    IToggleAction,
    ON_TOGGLE

} from '../actions';

export function toggle(state: any = { on: false }, action: IToggleAction): any {
    let delta: Object;
    switch (action.type) {
        case ON_TOGGLE:
            delta = lodash.assign({}, state, {
                on: action.on
            });
            return delta;
        default:
            return state;
    }
}
