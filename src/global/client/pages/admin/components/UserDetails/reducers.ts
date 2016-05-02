/// <reference path="../../../../../../../typings/main.d.ts" />
import * as lodash from 'lodash';

import * as actions from './actions';

interface IReducers {
    [id: string]: (state: any, action: any) => any
}

const reducers: IReducers = {
    
}

reducers[actions.LOADING] = (state, action) => {
    return _.merge(
        {},
        state,
        {
            userDetails: {
                loading: true
            }
        }
    )
}

reducers[actions.GET] = (state, action) => {
    let newState: any = _.merge(
        {},
        state,
        {

        }
    )
    
    newState.userDetails = {
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
/*
reducers[actions.UPDATE] = (state, action) => {
    let newState: any = _.merge(
        {},
        state,
        {

        }
    )
    
    newState.userDetails = {
        loading: false,
        data: {
            username: action.data.username,
            email: action.data.email,
            roles: action.data.roles,
            isActive: action.data.isActive
        }
    }
    
    return newState;
}*/

reducers[actions.CHANGE_PASSWORD] = (state, action) => {
    return _.merge(
        {},
        state,
        {
            userDetails: {
                loading: false
            }
        }
    )
}

export default function reducer(state: any = { userDetails: { loading: false } }, action) {
    if (action.type in reducers) {
        return reducers[action.type](state, action);
    }
    return state;
}