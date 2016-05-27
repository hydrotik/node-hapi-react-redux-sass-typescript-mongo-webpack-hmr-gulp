/// <reference path="../../../../../../../typings/main.d.ts" />

import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';
import {Promise} from 'es6-promise';
import * as _ from 'lodash';

export const GET: string = 'userDetails/GET';

export const UPDATE: string = 'userDetails/UPDATE';

export const CHANGE_PASSWORD: string = 'userDetails/CHANGE_PASSWORD';

export const LOADING: string = 'userDetails/LOADING';

export const DELETE: string = 'userDetails/DELETE';

export const SECTION_NAME: string = 'users';


export function deleteUser(id: string, router: any, location: any): any {

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

export function changePassword(id: string, password: string) {
    // Should return Promise from redux...
    return (dispatch: any, getState: any): Promise<any> => {
        
        let request: any = {
            method: 'PUT',
            url: '/api/' + SECTION_NAME + '/' + id + '/password',
            data: {
                password
            },
            useAuth: true
        };
        
        // Also returns a promise...
        return Fetch(request)
        .then(
            (result) => {
                
                dispatch({
                    type: CHANGE_PASSWORD,
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
                    type: CHANGE_PASSWORD,
                    data: result.data,
                    error: new Error("Could not change password")
                })
                
                return Promise.reject(new Error("Could not change password"));
            }

        )
    };
}

export function update(id: string, active: boolean, username: string, email: string) {
    // Should return Promise from redux...
    return (dispatch: any, getState: any): Promise<any> => {
        
        let request: any = {
            method: 'PUT',
            url: '/api/' + SECTION_NAME + '/' + id,
            data: {
                isActive: active,
                username,
                email
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
                    type: GET,
                    data: result.data,
                    error: new Error("Could not update user")
                })
                
                return Promise.reject(new Error("Could not update user"));
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
                
                dispatch({
                    type: GET,
                    data: result.data,
                    error: new Error("Could not load user " + id)
                })
                
                return Promise.reject(new Error("Could not load user " + id));
            }

        )
    };
}