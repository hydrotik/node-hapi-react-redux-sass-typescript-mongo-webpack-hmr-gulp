/// <reference path="../../../../../../../typings/main.d.ts" />
import * as _ from 'lodash';

import * as actions from './actions';

function loading(state, action) {
    return _.merge(
        {},
        state,
        {
            loading: true,
            loadFailed: false
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
            name: action.data.name,
            pivot: action.data.pivot
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
            name: action.data.name,
            pivot: action.data.pivot
        }
    }
    
    return newState;
}

export const REDUCER_NAME = 'statusDetails';
export function reducer(state: any = { loading: false }, action) {
    switch (action.type) {
        case actions.LOADING:
            return loading(state, action);
        case actions.GET:
            return get(state, action);
        case actions.UPDATE_DETAILS:
            return state;
    }
    return state;
}