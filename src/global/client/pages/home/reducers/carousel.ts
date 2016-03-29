/// <reference path="../../../../../../typings/main.d.ts" />

import * as lodash from 'lodash';
import {

    ICarouselAction,
    REQUEST_SLIDES,
    RECEIVE_SLIDES,

} from '../actions';

export function carouselContent(state: any = { isFetching: false, slides: [], lastUpdated: 0 }, action: ICarouselAction): any {
    let delta: Object;
    switch (action.type) {
        case REQUEST_SLIDES:
            delta = lodash.assign({}, state, {
                isFetching: true
            });
            return delta;
        case RECEIVE_SLIDES:
            delta = lodash.assign({}, state, {
                isFetching: false,
                slides: action.slides,
                lastUpdated: action.receivedAt
            });
            return delta;
        default:
            return state;
    }
}
