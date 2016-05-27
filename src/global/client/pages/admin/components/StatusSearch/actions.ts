/// <reference path='../../../../../../../typings/index.d.ts' />
import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';
import {Promise} from 'es6-promise';

const SECTION_NAME = 'statuses';

export const LOADING = 'statusSearch/LOADING';
export const SHOW_ADDNEW = 'statusSearch/SHOW_ADDNEW';
export const HIDE_ADDNEW = 'statusSearch/HIDE_ADDNEW';
export const CREATE = 'statusSearch/CREATE';
export const LIST = 'statusSearch/LIST';


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

export function create(name: string, pivot: string) {
    return (dispatch: any, getState: any) => {
        let request: any = {
            method: 'POST',
            url: '/api/' + SECTION_NAME,
            data: {
                pivot,
                name
            },
            useAuth: true
        };
        
        return Fetch(request)
        .then((result) => {
            dispatch({
                type: CREATE,
                data: {
                    pivot,
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

            return Promise.reject(new Error("Could not create status"));
        })
    }
}

