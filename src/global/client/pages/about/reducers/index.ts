/// <reference path="../../../../../../typings/tsd.d.ts" />
import { Reducer, combineReducers } from 'redux';

import { toggle, carouselContent, editorialContent } from './locals';

import { onExampleReducer } from '../../../reducers/globals';

export const rootReducer: Reducer = combineReducers({
    toggle,
    carouselContent,
    editorialContent,
    onExampleReducer
});
