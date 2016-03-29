/// <reference path="../../../../../../typings/main.d.ts" />
import { Reducer, combineReducers } from 'redux';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer } from '../../../reducers';

/* ****************************** */
/* *********** LOCALS *********** */

// Form
import { formSignup } from './form';

export const rootReducer: Reducer = combineReducers({
    onExampleReducer,
    formSignup
});

