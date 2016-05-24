/// <reference path="../../../../../../../typings/main.d.ts" />
import Fetch from '../../../../api/jsonfetch';

export const LOADING: string = 'accountDetails/LOADING';

export const GET: string = 'accountDetails/GET';

export const LINK_USER: string = 'accountDetails/LINK_USER';

export const UNLINK_USER: string = 'accountDetails/UNLINK_USER';

export const UPDATE_NAME: string = 'accountDetails/UPDATE_NAME';

export const DELETE: string = 'accountDetails/DELETE';

export const SECTION_NAME: string = 'accounts';

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
                error: new Error('Could not load account details')
            })
            return Promise.reject(new Error('Could not load account details'));
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
                error: new Error('Could not update account details')
            })
            return Promise.reject(new Error('Could not update account details'));
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

export function deleteAccount(id: string, router: any, location: any): any {

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