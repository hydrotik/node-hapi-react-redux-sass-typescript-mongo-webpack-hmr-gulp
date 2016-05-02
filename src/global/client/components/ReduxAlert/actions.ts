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

export interface IReduxAlertState {
    visible: boolean
    options?: {
        alertType?: ReduxAlertType,
        messageText?: string,
        custom?: any
    }
}

export interface IReduxAlertCollectionState {
    ids?: {
        [id: string]: IReduxAlertState
    }
}



export interface IReduxAlertAction {
    type: string
    id?: string
    options?: {
        alertType?: ReduxAlertType
        messageText?: string
        custom?: any
    }
}

export function reduxAlertDismissAll(): IReduxAlertAction {
    return {
        type: REDUXALERT_DISMISSALL
    };
}

export function reduxAlertDismiss(id: string, options?: {alertType?: ReduxAlertType, messageText?: string, custom?: any}): IReduxAlertAction {
    let action = {
        type: REDUXALERT_DISMISS, 
        id,
        options
    };
    
    return action;
}

export function reduxAlertDisplay(id: string, options?: {alertType?: ReduxAlertType, messageText?: string, custom?: any}): IReduxAlertAction {
    let action = {
        type: REDUXALERT_DISPLAY, 
        id,
        options
    };

    
    return action;
}

