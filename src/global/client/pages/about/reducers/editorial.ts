/// <reference path="../../../../../../typings/index.d.ts" />

import * as lodash from 'lodash';
import {

    IEditorialAction,
    REQUEST_EDITORIAL,
    RECEIVE_EDITORIAL,

} from '../actions';

export function editorialContent(state: any = { isFetching: false, editorial: [], lastUpdated: 0 }, action: IEditorialAction): any {
    let delta: Object;
    switch (action.type) {
        case REQUEST_EDITORIAL:
            delta = lodash.assign({}, state, {
                isFetching: true
            });
            return delta;
        case RECEIVE_EDITORIAL:
            delta = lodash.assign({}, state, {
                isFetching: false,
                editorial: action.editorial,
                lastUpdated: action.receivedAt
            });
            return delta;
        default:
            return state;
    }
}
