/// <reference path="../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';
import { Reducer, combineReducers } from 'redux';
import {
    /* carouselContent */
    IToggleAction,
    ON_TOGGLE


} from '../actions/animation.ts';

/* animation */
export interface IToggleReducer {
    on?: boolean;
}

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

export const rootReducer: Reducer = combineReducers({
    toggle
});
