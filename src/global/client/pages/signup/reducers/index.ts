/// <reference path="../../../../../../typings/tsd.d.ts" />
import { Reducer, combineReducers } from 'redux';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer } from '../../../reducers';

/* ****************************** */
/* *********** LOCALS *********** */

// Carousel
// import { carouselContent } from './carousel';

export const rootReducer: Reducer = combineReducers({
    onExampleReducer
});

