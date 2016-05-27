/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/admins-groups/Details.jsx
*/

// Core Imports
import * as React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import {Link} from 'react-router';
import {AdminGroupNameForm} from './components/AdminGroupNameForm';
import {PermissionsForm as AdminGroupPermissionsForm} from '../PermissionsForm';
import {DeleteForm as AdminGroupDeleteForm} from '../DeleteForm';
import {Spinner} from '../../../../components/Spinner/Spinner';
import {get, updateDetails, setPermissions, deleteAdminGroup} from './actions';
import {REDUCER_NAME} from './reducers';
import * as _ from 'lodash';
// Styles
import './_AdminGroupDetails.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps {
    loading: boolean
    loadFailed: boolean
    location: string
    onLoadDetails: (string) => any
    onDetailsSubmit: (id: string, data: any) => any
    onPermissionsSubmit: (id: string, data: any) => any
    onDeleteSubmit: (id: string, router: any, location: any) => any
    params: any
    
    group: {
        name: string
        permissions?: any
    }
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

const mapStateToProps = (state): any => {
    return {
        loadFailed: _.get(state, REDUCER_NAME + '.loadFailed', false),
        loading: _.get(state, REDUCER_NAME + '.loading', false),
        group: _.get(state, REDUCER_NAME + '.data', {name: ""})
    }
}

const mapDispatchToProps = (dispatch): any => {
    return {
        onLoadDetails: function(id: string) {
            return dispatch(get(id));
        },
        onDetailsSubmit: function(id: string, data: { name: string }) {
            return dispatch(updateDetails(id, data.name));
        },
        onPermissionsSubmit: function(id: string, data: { newPermission: string, permissions: {name: string, active: boolean}[] }) {
            return dispatch(setPermissions(id, toPermissionsObject(data.permissions)));
        },
        onDeleteSubmit: function(id: string, router: any, location: any) {
            return dispatch(deleteAdminGroup(id, router, location));
        }
    }
}

class Container extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }
    
    static contextTypes: React.ValidationMap<any> = {
        router: React.PropTypes.object
    }
    
    context: {
        router: any
    }
    
    componentWillMount(): any {
        const {
            onLoadDetails,
            params
        } = this.props as StateProps;
        (this.props as StateProps).onLoadDetails(params.id);
    
    }

    public render(): React.ReactElement<{}> {
        const {
            loadFailed,
            loading,
            group,
            onPermissionsSubmit,
            onDetailsSubmit,
            onDeleteSubmit,
            params
        } = this.props as StateProps;
        if (loading) {
            return (
                <section className='section-home container'>
                    <div className='row'>
                        <div className='col-sm-7'>
                            <h1 className='page-header'>
                                Admin Group Details
                            </h1>
                            <Alert bsStyle="info">
                                <span>Loading...</span>
                                <Spinner show={true} space="left" />
                            </Alert>
                        </div>
                    </div>
                </section>
            )
        }
        
        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Admin Group Details
                        </h1>
                        {
                            loadFailed &&
                            <Alert bsStyle="danger">
                                <h4>Could not load {params.id}</h4>
                                <Link
                                    className='btn btn-default btn-sm'
                                    to={_.join(_.dropRight(_.split(location.pathname, '/'), 1), '/')}>
                                    Back to Search
                                </Link>
                            </Alert>
                        }
                        
                        { !loading && !loadFailed &&
                        <div>
                        <AdminGroupNameForm
                            initialValues={{ name: group.name }}
                            onSubmit={onDetailsSubmit.bind(undefined, group.name)}
                        />
                        <AdminGroupPermissionsForm
                            initialValues={{ permissions: toPermissionsArray(group.permissions) }}
                            
                            onSubmit={onPermissionsSubmit.bind(undefined, params.id)}
                        />
                        <AdminGroupDeleteForm 
                            onSubmit={onDeleteSubmit.bind(undefined, params.id, this.context.router, location)}
                        />
                        </div>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export const AdminGroupDetails = connect(mapStateToProps, mapDispatchToProps)(Container);