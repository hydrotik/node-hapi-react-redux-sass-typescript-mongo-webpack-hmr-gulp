/// <reference path='../../../../../../../typings/main.d.ts' />

import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';

export const GET: string = 'statusDetails/GET';

export const UPDATE_DETAILS: string = 'statusDetails/UPDATE_DETAILS';

export const LOADING: string = 'statusDetails/LOADING';

export const ERROR: string = 'statusDetails/ERROR';

export const SECTION_NAME: string = 'statuses';

export function doDelete(data: any, router: any): any {

    let validation: IValidation;

    return (dispatch: any, getState: any) => {
        //dispatch(onRequestAction(DELETE_REQUEST, data));

        let id = data.id;
        delete data.id;

        let request: any = {
            method: 'DELETE',
            url: '/api/' + SECTION_NAME + '/' + id,
            data: data,
            useAuth: true
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;

                if (router) {
                    router.transitionTo(SECTION_NAME);
                    window.scrollTo(0, 0);
                }
            }

            // dispatch delete action
        });
    };
}


export function updateDetails(id: string, name: string) {
    // Should return Promise from redux...
    return (dispatch: any, getState: any): Promise<any> => {
        
        let request: any = {
            method: 'PUT',
            url: '/api/' + SECTION_NAME + '/' + id,
            data: {
                name
            },
            useAuth: true
        };
        
        // Also returns a promise...
        return Fetch(request)
        .then(
            (result) => {
                
                dispatch({
                    type: GET,
                    data: result.data
                })
                
                return Promise.resolve(result.data);
            }
        )
        // Catch errors in order to dispatch ERROR action, but also reject promise.
        // TODO: Need to consider how to translate Backend/Hapi error messages to redux-form compatible error messages
        .catch(
            (result) => {
                console.log(result);
                
                dispatch({
                    type: ERROR,
                    error: "Could not update status"
                })
                
                return Promise.reject(new Error("Could not update status"));
            }

        )
    };
}

export function get(id: string) {
    // Should return Promise from redux...
    return (dispatch: any, getState: any): Promise<any> => {
        
        dispatch({
            type: LOADING
        });
        
        let request: any = {
            method: 'GET',
            url: '/api/' + SECTION_NAME + '/' + id,
            useAuth: true
        };
        
        // Also returns a promise...
        return Fetch(request)
        .then(
            (result) => {
                
                dispatch({
                    type: GET,
                    data: result.data
                })
                
                return Promise.resolve(result.data);
            }
        )
        // Catch errors in order to dispatch ERROR action, but also reject promise.
        // TODO: Need to consider how to translate Backend/Hapi error messages to redux-form compatible error messages
        .catch(
            (result) => {
                console.log(result);
                
                dispatch({
                    type: ERROR,
                    error: "Could not load status " + id
                })
                
                return Promise.reject(new Error("Could not load status " + id));
            }

        )
    };
}