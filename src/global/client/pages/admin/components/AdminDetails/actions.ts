/// <reference path="../../../../../../../typings/main.d.ts" />
import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';
import {Promise} from 'es6-promise';
import * as _ from 'lodash';

export const LOADING: string = 'adminDetails/LOADING';

export const GET: string = 'adminDetails/GET';

export const LINK_USER: string = 'adminDetails/LINK_USER';

export const UNLINK_USER: string = 'adminDetails/UNLINK_USER';

export const SET_PERMISSIONS: string = 'adminDetails/SET_PERMISSIONS';

export const UPDATE_NAME: string = 'adminDetails/UPDATE_NAME';

export const DELETE: string = 'adminDetails/DELETE';

export const GET_GROUPS: string = 'adminDetails/GET_GROUPS';

export const SET_GROUPS: string = 'adminDetails/SET_GROUPS';

export const SECTION_NAME: string = 'admins';

export function get(id: string) {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'GET',
            url: '/api/' + SECTION_NAME + '/' + id,
            useAuth: true
        };
        
        dispatch({
            type: LOADING
        })
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: GET,
                data: result.data
            })
            return Promise.resolve(result.data);
        })
        .catch((result) => {
            dispatch({
                type: GET,
                data: result.data,
                error: new Error('Could not load admin details')
            })
            return Promise.reject(new Error('Could not load admin details'));
        })
    }
    
}

export function getGroups() {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'GET',
            url: '/api/admin-groups',
            useAuth: true
        };
        
        dispatch({
            type: LOADING
        })
        
        return Fetch(request)
        .then((result) => {
            console.log(result);
            dispatch({
                type: GET_GROUPS,
                allGroups: result.data.data
            })
            return Promise.resolve(result.data.data);
        })
        .catch((err) => {
            dispatch({
                type: GET_GROUPS,
                error: new Error('Could not load admin-groups')
            })
            return Promise.reject(new Error('Could not load admin-groups'));
        })
    }
    
}

export function updateName(id: string, name: {lastName: string, firstName: string, middleName: string}) {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'PUT',
            url: '/api/' + SECTION_NAME + '/' + id,
            data: {
                name: {
                    last: name.lastName,
                    first: name.firstName,
                    middle: name.middleName
                }
            },
            useAuth: true
        };
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: GET,
                data: result.data,
                name: {
                    lastName: _.get(result.data, 'name.last', ''),
                    firstName: _.get(result.data, 'name.first', ''),
                    middleName: _.get(result.data, 'name.middle', '')
                }
            })
            return Promise.resolve({ 
                lastName: _.get(result.data, 'name.last', ''),
                firstName: _.get(result.data, 'name.first', ''),
                middleName: _.get(result.data, 'name.middle', '')
            });
        })
        .catch((result) => {
            dispatch({
                type: GET,
                data: result.data,
                error: new Error('Could not update admin details')
            })
            return Promise.reject(new Error('Could not update admin details'));
        })
    }
}

export function linkUser(id: string, username: string) {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'PUT',
            url: '/api/' + SECTION_NAME + '/' + id + '/user',
            data: {
                username
            },
            useAuth: true
        };
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: LINK_USER,
                data: result.data
            })
            return Promise.resolve(result.data);
        })
        .catch((result) => {
            dispatch({
                type: LINK_USER,
                data: result.data,
                error: new Error('Could not link user')
            })
            return Promise.reject(new Error('Could not link user'));
        })
    }
}

export function unlinkUser(id: string) {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'DELETE',
            url: '/api/' + SECTION_NAME + '/' + id + '/user',
            useAuth: true
        };
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: UNLINK_USER,
                data: result.data
            })
            return Promise.resolve(result.data);
        })
        .catch((result) => {
            dispatch({
                type: UNLINK_USER,
                data: result.data,
                error: new Error('Could not link user')
            })
            return Promise.reject(new Error('Could not link user'));
        })
    }
}

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

export function setGroups(id: string, groups: any) {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'PUT',
            url: '/api/' + SECTION_NAME + '/' + id + '/groups',
            data: {
                groups
            },
            useAuth: true
        };
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: SET_GROUPS,
                id,
                groups
            })
            
            return Promise.resolve({id, groups});
        })
        .catch((err) => {
            dispatch({
                type: SET_GROUPS,
                id,
                groups,
                error: new Error("Could not set groups")
            })
            return Promise.reject(new Error("Could not set groups"));
        })
    }
}

export function deleteAdmin(id: string, router: any, location: any): any {

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