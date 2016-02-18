/// <reference path="../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';
import { Reducer, combineReducers } from 'redux';
import {

    /* carouselContent */
    ICarouselAction,
    REQUEST_SLIDES,
    RECEIVE_SLIDES

} from '../actions/carousel.ts';


/* carouselContent */
export interface ICarouselReducer {
    slides?: any;
    isFetching?: boolean;
    lastUpdated?: number;
}

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





export const rootReducer: Reducer = combineReducers({
    carouselContent
});
