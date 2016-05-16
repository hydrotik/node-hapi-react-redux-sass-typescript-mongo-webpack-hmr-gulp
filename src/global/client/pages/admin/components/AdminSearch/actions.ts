/// <reference path='../../../../../../../typings/main.d.ts' />
import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';

const SECTION_NAME = 'admins';

export const LOADING = 'adminSearch/LOADING';
export const SHOW_ADDNEW = 'adminSearch/SHOW_ADDNEW';
export const HIDE_ADDNEW = 'adminSearch/HIDE_ADDNEW';
export const CREATE = 'adminSearch/CREATE';
export const LIST = 'adminSearch/LIST';


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

export function create(name: {lastName: string, firstName: string, middleName?: string}) {
    const {
        lastName,
        firstName,
        middleName
    } = name;
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'POST',
            url: '/api/' + SECTION_NAME,
            data: {
                lastName,
                firstName,
                middleName
            },
            useAuth: true
        };
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: CREATE,
                name: {
                    lastName,
                    firstName,
                    middleName
                }
            })
            
            return Promise.resolve({
                name: {
                    lastName,
                    firstName,
                    middleName
                }
            })
        })
        .catch((err) => {

            return Promise.reject({error: "Could not create admin"});
        })
    }
}

