/// <reference path="../../../../../../typings/index.d.ts" />
import { Reducer, combineReducers } from 'redux';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer } from '../../../reducers';

/* ****************************** */
/* *********** LOCALS *********** */

// Carousel
import { carouselContent } from './carousel';

// Animation Toggle
import { toggle } from './toggle';

// Editorial
import { editorialContent } from './editorial';

export const rootReducer: Reducer = combineReducers({
    onExampleReducer,
    carouselContent,
    toggle,
    editorialContent
});
