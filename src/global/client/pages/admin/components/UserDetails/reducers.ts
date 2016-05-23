/// <reference path="../../../../../../../typings/main.d.ts" />
import * as lodash from 'lodash';

import * as actions from './actions';

interface IReducers {
    [id: string]: (state: any, action: any) => any
}

const reducers: IReducers = {
    
}

function loading(state, action) {
    return _.merge(
        {},
        state,
        {
            loadingFailed: false,
            loading: true
        }
    )
}

function get(state, action) {
    let newState: any = _.merge(
        {},
        state,
        {

        }
    )
    
    newState = {
        loading: false,
        loadFailed: !_.isUndefined(action.error),
        data: {
            username: action.data.username,
            email: action.data.email,
            roles: action.data.roles,
            isActive: action.data.isActive
        }
    }
    
    return newState;
}

function update(state, action) {
    let newState: any = _.merge(
        {},
        state,
        {

        }
    )
    
    newState.data = action.data;
    
    return newState;
}

function changePassword(state, action) {
    return _.merge(
        {},
        state,
        {
            loading: false
        }
    )
}

export const REDUCER_NAME = 'userDetails';
export function reducer(state: any = { loading: false }, action) {
    switch (action.type) {
        case actions.CHANGE_PASSWORD:
            return changePassword(state, action);
        case actions.LOADING:
            return loading(state, action);
        case actions.GET:
            return get(state, action);
        case actions.UPDATE:
            return update(state, action);
    }
    return state;
}