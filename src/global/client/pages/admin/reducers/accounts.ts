/// <reference path="../../../../../../typings/tsd.d.ts" />
import * as lodash from 'lodash';

import {
    SET_SORT_FILTER,
    IAccountsSortFilter,
    IAccountsResponse,
    GET_RESULTS_RESPONSE
} from '../actions'

function setSortFilter(state: any, action : IAccountsSortFilter) : any {
    return _.merge({}, state, { sortFilter: action.setting })
}

function setAccountsData(state: any, action : IAccountsResponse) : any {
    return _.merge({}, state, { data: action.response.data })
}

export default function (state = {data:[], sortFilter: ''}, action: any) : any {
    switch (action.type) {
        case SET_SORT_FILTER:
            return setSortFilter(state, action as IAccountsSortFilter)
        case GET_RESULTS_RESPONSE:
            return setAccountsData(state, action as IAccountsResponse)
    }
    return state
}
