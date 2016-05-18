/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/admins/Details.jsx
*/

// Core Imports
import * as React from 'react';
import {connect} from 'react-redux';
import {AdminGroupsForm} from './components/AdminGroupsForm';
import {PermissionsForm} from '../PermissionsForm';
import {NameDetailsForm} from '../NameDetailsForm'; 
import {UserLinkForm} from '../UserLinkForm';
import {DeleteForm} from '../DeleteForm';
import {get, unlinkUser, linkUser, updateName, setPermissions, setGroups, getGroups, deleteAdmin} from './actions';
import {REDUCER_NAME} from './reducers';
// Styles
import './_AdminDetails.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps {
    loading: boolean,
    params: any,
    onLoadDetails: (id: string) => any
    onNameSubmit: (id: string, data: any) => any
    onUserLinkSubmit: (id: string, user: any) => any
    onUserUnlinkSubmit: (id: string) => any
    onPermissionsSubmit: (id: string, data: any) => any
    onGroupsSubmit: (id: string, data: any) => any
    name: {
        firstName: string
        lastName: string
        middleName:string
    }
    permissions: {
        [key: string]: boolean
    }
    user: {
        name: string
        id: string
    },
    groups: {
        [key: string]: string
    },
    allGroups: {_id: string, name: string}[]
    
}
const toPermissionsArray = (permissionsObj: {[key: string]: boolean}): {name: string, active: boolean}[] => {
    
    if (_.isEmpty(permissionsObj)) {
        return undefined;
    }
    
    return _.map(permissionsObj, (v: boolean, k:string) => {
        return { name: k, active: v };
    })

}

const toPermissionsObject = (permissionsArr: {name: string, active: boolean}[]): {[key: string]: boolean} => {
    if (_.isEmpty(permissionsArr)) {
        return undefined;
    }
    return _.mapValues(_.groupBy(permissionsArr, (val: {name: string, active: boolean}) => { return val.name }), (val) => { return _.get(_.first(val), 'active');}) as {[key: string]: boolean};
}

const toGroupsArray = (groupsObj: {[key: string]: string}): {id: string, name: string}[] => {
    
    if (_.isEmpty(groupsObj)) {
        return undefined;
    }
    
    return _.map(groupsObj, (v: string, k:string) => {
        return { id: k, name: v };
    })

}

const toGroupsObject = (groupsArr: {id: string, name: string}[]): {[key: string]: string} => {
    if (_.isEmpty(groupsArr)) {
        return undefined;
    }
    return _.mapValues(_.groupBy(groupsArr, (val: {id: string, name: string}) => { return val.id }), (val) => { return _.get(_.first(val), 'name');}) as {[key: string]: string};
}

const mapStateToProps = (state) => {
    let name: any = _.get(state, REDUCER_NAME+'.data.name', {});
    
    return {
        loading: _.get(state, REDUCER_NAME+'.loading', false),
        name: { lastName: name.last, firstName: name.first, middleName: name.middle},
        permissions: _.get(state, REDUCER_NAME+'.data.permissions', undefined),
        user: _.get(state, REDUCER_NAME+'.data.user', undefined),
        allGroups: _.get(state, REDUCER_NAME+'.allGroups', undefined),
        groups: _.get(state, REDUCER_NAME+'.data.groups', undefined)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadDetails: function(id: string) {
            return dispatch(get(id))
            .then((result) => {
                return dispatch(getGroups());
            });
        },
        onNameSubmit: function(id: string, data: {firstName: string, lastName: string, middleName:string}) {
            return dispatch(updateName(id, data))
        },
        onPermissionsSubmit: function(id: string, data: { permissions: any }) {
            return dispatch(setPermissions(id, toPermissionsObject(data.permissions)));
        },
        onUserLinkSubmit: function(id: string, username: string) {
            return dispatch(linkUser(id, username));
        },
        onUserUnlinkSubmit: function(id: string) {
            return dispatch(unlinkUser(id));
        },
        onGroupsSubmit: function(id: string, data: { selectedGroups: any }) {
            return dispatch(setGroups(id, toGroupsObject(data.selectedGroups)));
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class AdminDetails extends React.Component<BaseProps, any> {

    public constructor(props?: BaseProps) {
        super(props);
    }
    
    componentWillMount(): any {
        const {
            params,
            onLoadDetails
        } = this.props as StateProps;
        onLoadDetails(params.id);
    }

    public render(): React.ReactElement<{}> {
        const {
            loading,
            name,
            user,
            allGroups,
            groups,
            params,
            permissions,
            onNameSubmit,
            onPermissionsSubmit,
            onGroupsSubmit,
            onUserLinkSubmit,
            onUserUnlinkSubmit
        } = this.props as StateProps;
        
        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Admin Details
                        </h1>
                        <NameDetailsForm 
                            initialValues={{
                                firstName: name.firstName,
                                lastName: name.lastName,
                                middleName: name.middleName
                            }}
                            
                            onSubmit={onNameSubmit.bind(undefined, params.id)}
                        />
                        <UserLinkForm 
                            initialValues={{
                                username: user ? user.name : undefined,
                                userId: user ? user.id : undefined
                            }}
                            
                            onUserLinkSubmit={onUserLinkSubmit.bind(undefined, params.id)}
                            
                            onUserUnlinkSubmit={onUserUnlinkSubmit.bind(undefined, params.id)}
                        />
                        <AdminGroupsForm
                            allGroups={_.map(allGroups, (val:any)=>{ return { id: val._id, name: val.name } })}
                            
                            initialValues={{
                                selectedGroups: toGroupsArray(groups)
                            }}
                            
                            onSubmit={onGroupsSubmit.bind(undefined, params.id)}
                        />
                        <PermissionsForm 
                            initialValues={{
                                permissions: toPermissionsArray(permissions)
                            }}
                            
                            onSubmit={onPermissionsSubmit.bind(undefined, params.id)}
                        />
                        <DeleteForm />
                    </div>
                </div>
            </section>
        );
    }
}
