/// <reference path="../../../../../../typings/tsd.d.ts" />

export const EDITORIAL: string = 'EDITORIAL';

export const REQUEST_EDITORIAL: string = 'REQUEST_EDITORIAL';
export const RECEIVE_EDITORIAL: string = 'RECEIVE_EDITORIAL';

/* **************** Editorial Content ********************* */
export interface IEditorialAction {
    type: string;
    editorial?: any[];
    receivedAt?: number;
    lastUpdated?: any;
    isFetching?: boolean;
}

export function requestEditorial(): IEditorialAction {
    return { type: REQUEST_EDITORIAL };
}

export function receiveEditorial(editorial: any[]): IEditorialAction {
    return { type: RECEIVE_EDITORIAL, editorial: editorial, receivedAt: Date.now() };
}
