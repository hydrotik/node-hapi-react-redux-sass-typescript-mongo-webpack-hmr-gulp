/// <reference path="../../../../typings/tsd.d.ts" />

// Global Action Constants here...

/* **************** Example Action Constant ******************* */
export const EXAMPLE_ACTION: string = 'EXAMPLE_ACTION';



// Global Actions here...

/* **************** Example Action Interface ****************** */
export interface IExampleAction {
    type: string;
    payload?: any[];
}

/* **************** Example Action Event ********************** */
export function onExample(payload: any[]): IExampleAction {
    return { type: EXAMPLE_ACTION, payload: payload };
}
