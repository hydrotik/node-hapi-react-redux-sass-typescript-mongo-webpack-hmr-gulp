/// <reference path="../../../../typings/tsd.d.ts" />

// Global Action Constants here...

/* **************** Example Action Constant ******************* */
export const ACTION_NAME: string = 'ACTION_NAME';



// Global Actions here...

/* **************** Example Action Interface ****************** */
export interface IExampleAction {
    type: string;
    payload?: any[];
    receivedAt?: number;
    lastUpdated?: any;
}

/* **************** Example Action Event ********************** */
export function receiveAction(payload: any[]): IExampleAction {
    return { type: ACTION_NAME, payload: payload, receivedAt: Date.now() };
}
