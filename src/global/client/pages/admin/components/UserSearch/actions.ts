/// <reference path='../../../../../../../typings/main.d.ts' />
import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';

const SECTION_NAME = 'users';

export const LOADING = 'userSearch/LOADING';
export const SHOW_ADDNEW = 'userSearch/SHOW_ADDNEW';
export const HIDE_ADDNEW = 'userSearch/HIDE_ADDNEW';
export const CREATE = 'userSearch/CREATE';
export const LIST = 'userSearch/LIST';


export function showAddNew() {
    return {
        type: SHOW_ADDNEW
    };
}

export function hideAddNew() {
    return {
        type: HIDE_ADDNEW
    };
}

export function list() {
    return (dispatch: any, getState: any) => {
        dispatch({
            type: LOADING
        })
        let request: any = {
            method: 'GET',
            url: '/api/' + SECTION_NAME,
            useAuth: true
        };
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: LIST,
                data: result.data
            })
            
            return Promise.resolve(result.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
    }
}

export function create(username: string, email: string, password: string) {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'POST',
            url: '/api/' + SECTION_NAME,
            data: {
                username,
                email,
                password
            },
            useAuth: true
        };
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: CREATE,
                data: {
                    username,
                    email,
                    password
                }
            })
            
            return Promise.resolve({
                data: {
                    username,
                    email,
                    password
                }
            })
        })
        .catch((err) => {

            return Promise.reject({error: "Could not create user"});
        })
    }
}

