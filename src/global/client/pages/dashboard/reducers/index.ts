/// <reference path="../../../../../../typings/index.d.ts" />
import { Reducer, combineReducers } from 'redux';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer, onNavBarReducer } from '../../../reducers';

/* ****************************** */
/* *********** LOCALS *********** */

// Account Form
import accounts from './accounts';

export const rootReducer: Reducer = combineReducers({
    onNavBarReducer,
    accounts
});

