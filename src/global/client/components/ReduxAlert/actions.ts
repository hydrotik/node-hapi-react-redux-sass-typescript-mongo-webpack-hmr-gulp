export const REDUXALERT_INITIALIZE: string = 'REDUXALERT_INITIALIZE';

export const REDUXALERT_DESTROY: string = 'REDUXALERT_DESTROY';

export const REDUXALERT_DISMISS: string = 'REDUXALERT_DISMISS';

export const REDUXALERT_DISMISSALL: string = 'REDUXALERT_DISMISSALL';

export const REDUXALERT_DISPLAY: string = 'REDUXALERT_DISPLAY';

export enum ReduxAlertType {
    None = 0,
    Info,
    Success,
    Warning,
    Error
}

export interface IReduxAlertOptions {
    alertType: ReduxAlertType,
    messageText: string,
    custom?: any
}

export interface IReduxAlertState {
    visible: boolean
    options: IReduxAlertOptions
}

export interface IReduxAlertCollectionState {
    ids?: {
        [id: string]: IReduxAlertState
    }
}

export interface IReduxAlertAction {
    type: string,
    id?: string,
    visible?: boolean,
    options?: IReduxAlertOptions
}

export function reduxAlertDismissAll(): { type: string } {
    return {
        type: REDUXALERT_DISMISSALL
    };
}

export function reduxAlertDismiss(id: string): { type: string, id: string } {
    let action = {
        type: REDUXALERT_DISMISS, 
        id,
        visible: false
    };
    
    return action;
}

export function reduxAlertInitialize(id: string, visible?: boolean, options?: IReduxAlertOptions): {type: string, id: string, visible: boolean, options?: IReduxAlertOptions} {
    let action = {
        type: REDUXALERT_INITIALIZE, 
        id,
        visible: visible || false,
        options
    };
    
    return action;
}

export function reduxAlertDestroy(id: string): {type: string, id: string } {
    let action = {
        type: REDUXALERT_DESTROY, 
        id
    };
    
    return action;
}

export function reduxAlertDisplay(id: string, options: IReduxAlertOptions): { type: string, id: string, options: IReduxAlertOptions } {
    let action = {
        type: REDUXALERT_DISPLAY, 
        id,
        visible: true,
        options
    };
    
    return action;
}

