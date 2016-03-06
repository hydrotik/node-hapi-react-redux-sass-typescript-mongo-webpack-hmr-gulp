/// <reference path="../../../../../../typings/tsd.d.ts" />
import { Reducer, combineReducers } from 'redux';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer } from '../../../reducers';

/* ****************************** */
/* *********** LOCALS *********** */

// Account Form
import { account } from './account';

export const rootReducer: Reducer = combineReducers({
    onExampleReducer,
    account
});

