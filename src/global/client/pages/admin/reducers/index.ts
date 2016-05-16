/// <reference path="../../../../../../typings/main.d.ts" />
import { Reducer, combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer, onNavBarReducer } from '../../../reducers';
/* ****************************** */
/* *********** LOCALS *********** */

// Account Form
import accounts from './accounts';
import * as userDetails from '../components/UserDetails/reducers';
import * as userSearch from '../components/UserSearch/reducers';

export const rootReducer: Reducer = combineReducers({
    form: formReducer,
    onNavBarReducer,
    accounts,
    [userDetails.REDUCER_NAME]: userDetails.reducer,
    [userSearch.REDUCER_NAME]: userSearch.reducer,
});

