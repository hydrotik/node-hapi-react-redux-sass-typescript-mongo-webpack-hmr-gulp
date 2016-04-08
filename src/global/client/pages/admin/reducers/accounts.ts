/// <reference path="../../../../../../typings/main.d.ts" />
import * as lodash from 'lodash';

import {
    SET_SORT_FILTER,
    IAccountsSortFilter,
    IAccountsResponse,
    GET_RESULTS_RESPONSE,
    CREATE_NEW_REQUEST,
    CREATE_NEW_RESPONSE,
    SHOW_CREATE_ACCOUNT_MODAL,
    HIDE_CREATE_ACCOUNT_MODAL,
    createNewAsync
} from '../actions'

function setSortFilter(state: any, action : IAccountsSortFilter) : any {
    return _.merge({}, state, { sortFilter: action.setting })
}

function setAccountsData(state: any, action : IAccountsResponse) : any {
    return _.merge({}, state, { data: action.response.data })
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

export default function (state = {data:[], sortFilter: ''}, action: any) : any {
    switch (action.type) {
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
    }
    return state
}
