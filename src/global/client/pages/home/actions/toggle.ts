/// <reference path="../../../../../../typings/tsd.d.ts" />

export const ON_TOGGLE: string = 'ON_TOGGLE';

/* **************** Animation Toggle ********************* */
export interface IToggleAction {
    type: string;
    on?: boolean;
}

export function onToggle(on: boolean): IToggleAction {
    return { type: ON_TOGGLE, on: on };
}
