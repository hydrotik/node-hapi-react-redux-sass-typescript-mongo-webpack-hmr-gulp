/// <reference path="../../../../../../typings/main.d.ts" />
import * as lodash from 'lodash';

import {
    SET_SORT_FILTER,
    IAccountsSortFilter,
    IAccountsResponse,
    GET_RESULTS_REQUEST,
    GET_RESULTS_RESPONSE,
    GET_DETAILS_REQUEST,
    GET_DETAILS_RESPONSE,
    CREATE_NEW_REQUEST,
    CREATE_NEW_RESPONSE,
    SHOW_CREATE_ACCOUNT_MODAL,
    HIDE_CREATE_ACCOUNT_MODAL,
    ACCOUNT_LINK_REQUEST,
    ACCOUNT_LINK_RESPONSE,
    ACCOUNT_UNLINK_REQUEST,
    ACCOUNT_UNLINK_RESPONSE,
    createNewAsync
} from '../actions'

function setSortFilter(state: any, action : IAccountsSortFilter) : any {
    return _.merge({}, state, { sortFilter: action.setting })
}

function setAccountsData(state: any, action : IAccountsResponse) : any {
    return _.merge({}, state, { loading: false, data: action.response.data })
}

function startCreateNew(state: any, action: any): any {
    return _.merge(
        {},
        state,
        {
            addNewAccount: {
                active: true
            }
        }
    )
}

function endCreateNew(state: any, action: any): any {
    return _.merge(
        {},
        state,
        {
            addNewAccount: {
                active: false
            }
        }
    )
}

function waitingForResults(state: any, action: any): any {
    return _.merge(
        {},
        state,
        {
            loading: true
        }
    )
}

function loadDetailsStart(state: any, action: any): any {
    return _.merge(
        {},
        state,
        {
            details: {
                loading: true
                
            }
        }
    )
}
function loadDetailsDone(state: any, action: any) : any{
    
    return _.merge(
        {},
        state,
        {
            details: {
                loading: false,
                initialValues: {
                    firstName: _.get(action, 'response.data.name.first'),
                    lastName: _.get(action, "response.data.name.last"),
                    middleName: _.get(action, "response.data.name.middle"),
                    username: _.get(action, "response.data.user.name")
                }
            }
        }
    )
}

function startAccountLink(state: any, action: any): any {
    
}

function endAccountLink(state: any, action: any): any {
    
}

function startAccountUnlink(state: any, action: any): any {
    
}

function endAccountUnlink(state: any, action: any): any {
    
}

export default function (state = {data:[], sortFilter: ''}, action: any) : any {
    switch (action.type) {
        case GET_RESULTS_REQUEST:
            return waitingForResults(state, action)
        case SET_SORT_FILTER:
            return setSortFilter(state, action as IAccountsSortFilter)
        case GET_RESULTS_RESPONSE:
            return setAccountsData(state, action as IAccountsResponse)
        case SHOW_CREATE_ACCOUNT_MODAL:
            return startCreateNew(state, action)
        case HIDE_CREATE_ACCOUNT_MODAL:
            return endCreateNew(state, action)
        case CREATE_NEW_RESPONSE:
            return endCreateNew(state, action)
        case GET_DETAILS_REQUEST:
            return loadDetailsStart(state, action);
        case GET_DETAILS_RESPONSE:
            return loadDetailsDone(state, action);
    }
    return state
}
