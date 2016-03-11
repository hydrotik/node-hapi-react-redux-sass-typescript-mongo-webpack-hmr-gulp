/// <reference path="../../../../../../typings/tsd.d.ts" />
import { Reducer, combineReducers } from 'redux';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer } from '../../../reducers';

/* ****************************** */
/* *********** LOCALS *********** */

// Login
import {
    login
} from './login';

import {
    forgot
} from './forgot';

import {
    reset
} from './reset';

export const rootReducer: Reducer = combineReducers({
    login,
    forgot,
    reset,
    onExampleReducer
});

