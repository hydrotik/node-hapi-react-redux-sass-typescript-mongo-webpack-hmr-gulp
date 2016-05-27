/// <reference path='../../../../../../../typings/main.d.ts' />
import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';
import * as _ from 'lodash';
import {Promise} from 'es6-promise';

const SECTION_NAME = 'accounts';

export const LOADING = 'accountSearch/LOADING';
export const SHOW_ADDNEW = 'accountSearch/SHOW_ADDNEW';
export const HIDE_ADDNEW = 'accountSearch/HIDE_ADDNEW';
export const CREATE = 'accountSearch/CREATE';
export const LIST = 'accountSearch/LIST';
export const SET_SORT_FILTER = 'accountSearch/SET_SORT_FILTER';

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
                data: result.data.data
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
                name: {
                    last: lastName,
                    first: firstName,
                    middle: middleName || undefined
                }
                
            },
            useAuth: true
        };
        
        return Fetch(request)
        .then(
            (result) => {
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
            .catch( 
            (err) => {

                return Promise.reject(new Error("Could not create account"));
            }
        );
    }
}

export function setSortFilter(sortOrFilter: string): any {

            return {
                type: SET_SORT_FILTER,
                setting: sortOrFilter
            }

}