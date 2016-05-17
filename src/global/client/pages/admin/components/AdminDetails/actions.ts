/// <reference path="../../../../../../../typings/main.d.ts" />
import Fetch from '../../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../../api/parsevalidation';

export const LOADING: string = 'adminDetails/LOADING';

export const GET: string = 'adminDetails/GET';

export const SET_PERMISSIONS: string = 'adminDetails/SET_PERMISSIONS';

export const UPDATE_NAME: string = 'adminDetails/UPDATE_NAME';

export const DELETE: string = 'adminDetails/DELETE';

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
        .catch((err) => {
            return Promise.reject(new Error('Could load admin details'));
        })
    }
    
}

export function updateName(id: string, name: {lastName: string, firstName: string, middleName: string}) {
    
}

export function setPermissions(id: string, permissions: any) {
    
}

export function setGroups(id: string, groups: any) {
    
}

export function deleteAdmin(id: string) {
    
}