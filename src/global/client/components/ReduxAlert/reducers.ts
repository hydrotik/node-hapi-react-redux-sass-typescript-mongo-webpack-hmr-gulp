import * as _ from 'lodash';

import * as actions from './actions';

function dismissState(state: actions.IReduxAlertCollectionState, action: actions.IReduxAlertAction) {
    state = _.merge(
        {},
        state,
        {
            ids: {
                
            }
        }
    );
    
    state.ids[action.id].visible = false;
    
    return state;
}

function dismissAllState(state: actions.IReduxAlertCollectionState) {
    
    state = _.merge(
        {},
        state,
        { ids: {} }
    );
    
    state.ids = _.mapValues(state.ids, function(r) {
        return {visible: false};
    })
    
    return state;
}

function displayState(state: actions.IReduxAlertCollectionState, action: actions.IReduxAlertAction) {
    
    state = _.merge(
        {},
        state,
        { ids: {} }
    );
    
    state.ids[action.id] = {
        visible: true,
        options: action.options
    }
    
    return state;
}

export function reducer(state: actions.IReduxAlertCollectionState = { ids: {} }, action: actions.IReduxAlertAction) : any {
    
    switch (action.type) {
        
        case (actions.REDUXALERT_DISMISSALL):
            return dismissAllState(state);
        
        case (actions.REDUXALERT_DISMISS):
            return dismissState(state, action);

        case (actions.REDUXALERT_DISPLAY):
            return displayState(state, action);

    }
    
    return state;
    
}