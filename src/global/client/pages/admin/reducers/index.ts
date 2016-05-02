/// <reference path="../../../../../../typings/main.d.ts" />
import { Reducer, combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { reducer as reduxAlertReducer } from '../../../components/ReduxAlert/reducers'

/* ******************************* */
/* *********** GLOBALS *********** */

// Example in Global
import { onExampleReducer, onNavBarReducer } from '../../../reducers';
/* ****************************** */
/* *********** LOCALS *********** */

// Account Form
import accounts from './accounts';
import users from '../components/UserDetails/reducers';

export const rootReducer: Reducer = combineReducers({
    form: formReducer,
    onNavBarReducer,
    accounts,
    reduxAlertReducer,
    users
});

