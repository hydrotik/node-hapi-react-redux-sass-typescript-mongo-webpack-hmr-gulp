/// <reference path='../../../../../../../typings/main.d.ts' />
import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';

const SECTION_NAME = 'admin-groups';

export const LOADING = 'adminGroupSearch/LOADING';
export const SHOW_ADDNEW = 'adminGroupSearch/SHOW_ADDNEW';
export const HIDE_ADDNEW = 'adminGroupSearch/HIDE_ADDNEW';
export const CREATE = 'adminGroupSearch/CREATE';
export const LIST = 'adminGroupSearch/LIST';


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

export function create(name: string) {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'POST',
            url: '/api/' + SECTION_NAME,
            data: {
                name
            },
            useAuth: true
        };
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: CREATE,
                data: {
                    name
                }
            })
            
            return Promise.resolve({
                data: {
                    name
                }
            })
        })
        .catch((err) => {

            return Promise.reject(new Error("Could not create admin-group"));
        })
    }
}

