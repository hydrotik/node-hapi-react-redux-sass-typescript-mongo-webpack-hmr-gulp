/// <reference path="../../../../../../typings/tsd.d.ts" />

import * as Fetch from '../../../utils/jsonfetch';

export const SEND_REQUEST: string = 'SEND_REQUEST';
export const RECEIVE_RESPONSE: string = 'RECEIVE_RESPONSE';

/* **************** Form Send Action Interface ****************** */
export interface IFormSendRequestAction {
    type: string;
    data?: any;
}

/* **************** Form Send Action Event ********************** */
export function sendRequest(data: any): IFormSendRequestAction {
    return { type: SEND_REQUEST, data: data };
}

/* **************** Form Recieve Action Interface ****************** */
export interface IRecieveResponseAction {
    type: string;
    response?: any;
}

/* **************** Form Recieve Action Event ********************** */
export function recieveResponse(response: any): IRecieveResponseAction {
    return { type: RECEIVE_RESPONSE, response: response };
}


export function handleRequest(data:any): void {

    //dispatch(VIEW_ACTION, Types.SEND_REQUEST, data);

    var request = {
        method: 'POST',
        url: '/api/signup',
        data: data
    };

    Fetch(request, function(err, response) {

        if (!err) {
            window.location.href = '/account';
            response.success = true;
        }

        //dispatch(SERVER_ACTION, Types.RECEIVE_RESPONSE, response);
    });
}