/// <reference path='../../../../../../../typings/index.d.ts' />
import * as _ from 'lodash';

import * as actions from './actions';

function showAddNew(state, action) {
    let newState = _.merge(
        {},
        state,
        {
            loading: false,
            addNew: {
                visible: true
            }
        }
    )
    
    return newState;
}

function hideAddNew(state, action) {
    let newState = _.merge(
        {},
        state,
        {
            loading: false,
            addNew: {
                visible: false
            }
        }
    )
    
    return newState;
}

function create(state, action) {
    return state;
}

function list(state, action) {
    let newState:any = _.merge(
        {},
        state,
        {
            loading: false,
            addNew: {
                visible: false
            }
        }
    )
    
    newState.results = action.data;
    return newState;
}

export const REDUCER_NAME = 'userSearch';
export function reducer(state = {}, action) {
    switch (action.type) {
        case actions.SHOW_ADDNEW:
            return showAddNew(state, action);
        case actions.HIDE_ADDNEW:
            return hideAddNew(state, action);
        case actions.LIST:
            return list(state, action);
        case actions.CREATE:
            return create(state, action);
    }
    
    return state;
}

