/// <reference path="../../../../../../../typings/main.d.ts" />
import * as _ from 'lodash';
import * as actions from './actions';

export const REDUCER_NAME = 'adminDetails';

function loading(state, action) {
    let newState = _.merge(
        {},
        state,
        {
            loading: true
        }
    )
    return newState;
}

function get(state, action) {
    let newState = _.merge(
        {},
        state,
        {
            loading: false
        }
    )
    newState.data = action.data;
    
    return state;
    
}

export function reducer(state = {}, action) {
    switch(action.type) {
        case action.LOADING: 
            return loading(state, action);
        case actions.GET:
            return get(state, action);
    }
    return state;
}