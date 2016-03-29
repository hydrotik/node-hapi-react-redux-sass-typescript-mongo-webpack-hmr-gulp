/// <reference path="../../../../../../typings/main.d.ts" />
import { Reducer, combineReducers } from 'redux';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer } from '../../../reducers';

/* ****************************** */
/* *********** LOCALS *********** */

// Account Form
import accounts from './accounts';

export const rootReducer: Reducer = combineReducers({
    accounts
});

