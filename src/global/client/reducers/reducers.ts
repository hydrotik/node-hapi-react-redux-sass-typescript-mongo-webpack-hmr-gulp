/// <reference path="../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';
import { Reducer, combineReducers } from 'redux';
import {

    /* carouselContent */
    IScrollAction,
    ON_SCROLL,

    /* carouselContent */
    ICarouselAction,
    REQUEST_SLIDES,
    RECEIVE_SLIDES,

    /* editorialContent */
    IEditorialAction,
    REQUEST_EDITORIAL,
    RECEIVE_EDITORIAL


} from '../actions/actions';


/* editorialContent */
export function scroll(state: any = { scrollTop: 0 }, action: IScrollAction): any {
    let delta: Object;
    switch (action.type) {
        case ON_SCROLL:
            delta = lodash.assign(state, {
                scrollTop: action.scrollTop
            });
            return delta;
        default:
            return state;
    }
}

/* carouselContent */
export function carouselContent(state: any = { isFetching: false, slides: [], lastUpdated: 0 }, action: ICarouselAction): any {
    let delta: Object;
    switch (action.type) {
        case REQUEST_SLIDES:
            delta = lodash.assign(state, {
                isFetching: true
            });
            return delta;
        case RECEIVE_SLIDES:
            delta = lodash.assign(state, {
                isFetching: false,
                slides: action.slides,
                lastUpdated: action.receivedAt
            });
            return delta;
        default:
            return state;
    }
}


/* editorialContent */
export function editorialContent(state: any = { isFetching: false, editorial: [], lastUpdated: 0 }, action: IEditorialAction): any {
    let delta: Object;
    switch (action.type) {
        case REQUEST_EDITORIAL:
            delta = lodash.assign(state, {
                isFetching: true
            });
            return delta;
        case RECEIVE_EDITORIAL:
            delta = lodash.assign(state, {
                isFetching: false,
                editorial: action.editorial,
                lastUpdated: action.receivedAt
            });
            return delta;
        default:
            return state;
    }
}





export const rootReducer: Reducer = combineReducers({
    scroll,
    carouselContent,
    editorialContent
});

/*



*/
