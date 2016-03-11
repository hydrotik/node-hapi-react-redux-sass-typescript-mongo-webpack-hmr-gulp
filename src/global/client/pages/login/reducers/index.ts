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

export const rootReducer: Reducer = combineReducers({
    login,
    onExampleReducer
});

