/// <reference path="../../../../../../../typings/main.d.ts" />
import * as lodash from 'lodash';

import * as actions from './actions';

function loading(state, action) {
    return _.merge(
        {},
        state,
        {
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
        data: {
            name: action.data.name,
            permissions: action.data.permissions || undefined
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
    
    newState = {
        loading: false,
        data: {
            username: action.data.username,
            email: action.data.email,
            roles: action.data.roles,
            isActive: action.data.isActive
        }
    }
    
    return newState;
}

function addPermission(state, action) {
    let permissions = {
        [action.name]: true
    }
    let newState: any = _.merge(
        {},
        state,
        {
            details: {
                permissions
            }
        }
    );
    
    return newState;
}

export const REDUCER_NAME = 'adminGroupDetails';
export function reducer(state: any = { loading: false }, action) {
    switch (action.type) {
        case actions.LOADING:
            return loading(state, action);
        case actions.GET:
            return get(state, action);
    }
    return state;
}