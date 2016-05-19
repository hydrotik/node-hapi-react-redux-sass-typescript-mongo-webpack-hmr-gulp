/// <reference path='../../../../../../../typings/main.d.ts' />

import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';

export const GET: string = 'statusDetails/GET';

export const UPDATE_DETAILS: string = 'statusDetails/UPDATE_DETAILS';

export const LOADING: string = 'statusDetails/LOADING';

export const ERROR: string = 'statusDetails/ERROR';

export const DELETE: string = 'statusDetails/DELETE';

export const SECTION_NAME: string = 'statuses';


export function deleteStatus(id: string, router: any, location: any): any {

    return (dispatch: any, getState: any) => {

        let request: any = {
            method: 'DELETE',
            url: '/api/' + SECTION_NAME + '/' + id,
            useAuth: true
        };

        return Fetch(request)
        .then((result) => {
            
            
            return dispatch({
                type: DELETE,
                id
            })
            .then((result) => {
                let newLocation = _.join(_.dropRight(_.split(location.pathname, '/'), 1), '/');
                if (router) {
                    router.replace(newLocation);
                    window.scrollTo(0, 0);
                }
                return Promise.resolve({id});
            })
            
        })
        .catch((err) => {
            dispatch({
                    type: ERROR,
                    error: "Could not delete status"
                })
                
                return Promise.reject(new Error("Could not delete status"));
        })
    }
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