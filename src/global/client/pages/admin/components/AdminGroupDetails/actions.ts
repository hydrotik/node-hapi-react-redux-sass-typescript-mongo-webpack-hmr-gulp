/// <reference path="../../../../../../../typings/main.d.ts" />

import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';

export const GET: string = 'adminGroupDetails/GET';

export const UPDATE_DETAILS: string = 'adminGroupDetails/UPDATE_DETAILS';

export const SET_PERMISSIONS: string = 'adminGroupDetails/SET_PERMISSIONS';

export const LOADING: string = 'adminGroupDetails/LOADING';

export const ERROR: string = 'adminGroupDetails/ERROR';

export const DELETE: string = 'adminGroupDetails/DELETE';

export const SECTION_NAME: string = 'admin-groups';

export function setPermissions(id: string, permissions: any) {
    
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'PUT',
            url: '/api/' + SECTION_NAME + '/' + id + '/permissions',
            data: {
                permissions
            },
            useAuth: true
        };
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: SET_PERMISSIONS,
                id,
                permissions
            })
            
            return Promise.resolve({id, permissions});
        })
        .catch((err) => {
            dispatch({
                type: SET_PERMISSIONS,
                id,
                permissions,
                error: new Error("Could not set permissions")
            })
            return Promise.reject(new Error("Could not set permissions"));
        })
    }
}

export function deleteAdminGroup(id: string, router: any, location: any): any {

    return (dispatch: any, getState: any) => {

        let request: any = {
            method: 'DELETE',
            url: '/api/' + SECTION_NAME + '/' + id,
            useAuth: true
        };

        return Fetch(request)
        .then((result) => {
            
            
            dispatch({
                type: DELETE,
                id
            })

            let newLocation = _.join(_.dropRight(_.split(location.pathname, '/'), 1), '/');
            if (router) {
                router.replace(newLocation);
                window.scrollTo(0, 0);
            }
            return Promise.resolve({id});

            
        })
        .catch((err) => {
            dispatch({
                type: DELETE,
                id,
                error: err
            })
                
            return Promise.reject(err);
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
                    type: UPDATE_DETAILS,
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
                    type: UPDATE_DETAILS,
                    data: result.data,
                    error: new Error("Could not update admin-group")
                })
                
                return Promise.reject(new Error("Could not update admin-group"));
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
                    type: GET,
                    data: result.data,
                    error: new Error("Could not load admin-group " + id)
                })
                
                return Promise.reject(new Error("Could not load admin-group " + id));
            }

        )
    };
}