/// <reference path="../../../../../../typings/main.d.ts" />
import * as _ from 'lodash';

import * as actions from '../actions/users';

interface IReducers {
    [id: string]: (state: any, action: any) => any
}

const reducers: IReducers = {
    
}

reducers[actions.GET_DETAILS_REQUEST] = (state, action) => {
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

reducers[actions.GET_DETAILS_RESPONSE] = (state, action) => {
    let newState: any = _.merge(
        {},
        state,
        {
            userDetails: {
                loading: false
            }
        }
    )
    
    newState.userDetails = {
        loading: false,
        data: {
            username: action.response.data.username,
            email: action.response.data.email,
            roles: action.response.data.roles,
            isActive: action.response.data.isActive
        }
    }
    
    return newState;
}

export default function reducer(state: any = { userDetails: { loading: false } }, action) {
    if (action.type in reducers) {
        return reducers[action.type](state, action);
    }
    return state;
}