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
    
    _.forEach(state.ids, function(r) {
        r.visible = false;
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

function initializeState(state: actions.IReduxAlertCollectionState, action: actions.IReduxAlertAction) {
    state = _.merge(
        {},
        state,
        { ids: {} }
    );
    
    state.ids[action.id] = {
        visible: action.visible,
        options: action.options
    }
    
    return state;
}

function destroyState(state: actions.IReduxAlertCollectionState, action: actions.IReduxAlertAction) {
    state = _.merge(
        {},
        state,
        { ids: {} }
    );
    
    delete state.ids[action.id];
    
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
            
        case (actions.REDUXALERT_INITIALIZE):
            return initializeState(state, action);
        
        case (actions.REDUXALERT_DESTROY):
            return destroyState(state, action);

    }
    
    return state;
    
}