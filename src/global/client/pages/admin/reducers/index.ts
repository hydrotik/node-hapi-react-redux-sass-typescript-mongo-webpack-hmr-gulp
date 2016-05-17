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
import * as adminSearch from '../components/AdminSearch/reducers';
import * as adminGroupSearch from '../components/AdminGroupSearch/reducers';
import * as adminGroupDetails from '../components/AdminGroupDetails/reducers';
import * as adminDetails from '../components/AdminDetails/reducers';

export const rootReducer: Reducer = combineReducers({
    form: formReducer,
    onNavBarReducer,
    accounts,
    [userDetails.REDUCER_NAME]: userDetails.reducer,
    [userSearch.REDUCER_NAME]: userSearch.reducer,
    [adminSearch.REDUCER_NAME]: adminSearch.reducer,
    [adminGroupSearch.REDUCER_NAME]: adminGroupSearch.reducer,
    [adminGroupDetails.REDUCER_NAME]: adminGroupDetails.reducer,
    [adminDetails.REDUCER_NAME]: adminDetails.reducer
});

