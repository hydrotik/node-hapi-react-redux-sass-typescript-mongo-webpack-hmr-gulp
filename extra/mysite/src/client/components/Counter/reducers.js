import * as actions from './actions';
import * as _ from 'lodash';

export const REDUCER_NAME = "counter";

// "Pure" function
function increment(state, action) {
    return {
        count: _.get(state, "count") + 1
    }
}

// "Pure" function
function reducer(state = { count: 0 }, action) {
    switch (action.type) {
        case actions.INCREMENT:
            return increment(state, action);
    }

    return state;
}

export default reducer;