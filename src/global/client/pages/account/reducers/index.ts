/// <reference path="../../../../../../typings/main.d.ts" />
import { Reducer, combineReducers } from 'redux';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer } from '../../../reducers';

import {onNavBarReducer} from '../../../reducers';
/* ****************************** */
/* *********** LOCALS *********** */

// Account Form
import { account } from './account';

export const rootReducer: Reducer = combineReducers({
    onNavBarReducer,
    account
});

