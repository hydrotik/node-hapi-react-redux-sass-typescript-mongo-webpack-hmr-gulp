/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/admins-groups/Details.jsx
*/

// Core Imports
import * as React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import {AdminGroupNameForm} from './components/AdminGroupNameForm';
import {PermissionsForm as AdminGroupPermissionsForm} from '../../../../components/PermissionsForm';
import {AdminGroupDeleteForm} from './components/AdminGroupDeleteForm';
import {Spinner} from '../../../../components/Spinner/Spinner';
import {get, updateDetails, setPermissions} from './actions';
import {REDUCER_NAME} from './reducers';
// Styles
import './_AdminGroupDetails.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps {
    loading: boolean
    location: string
    onLoadDetails: (string) => any
    onDetailsSubmit: (id: string, data: any) => any
    onPermissionsSubmit: (id: string, data: any) => any
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

const mapStateToProps = (state) => {
    return {
        loading: _.get(state, REDUCER_NAME + '.loading', false),
        group: _.get(state, REDUCER_NAME + '.data', {name: ""})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadDetails: function(id: string) {
            return dispatch(get(id));
        },
        onDetailsSubmit: function(id: string, data: { name: string }) {
            return dispatch(updateDetails(id, data.name));
        },
        onPermissionsSubmit: function(id: string, data: { newPermission: string, permissions: {name: string, active: boolean}[] }) {
            return dispatch(setPermissions(id, toPermissionsObject(data.permissions)));
        }
    }
}
@connect(mapStateToProps, mapDispatchToProps)
export class AdminGroupDetails extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
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
            loading,
            group,
            onPermissionsSubmit,
            onDetailsSubmit,
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
                        
                        <AdminGroupNameForm
                            initialValues={{ name: group.name }}
                            onSubmit={onDetailsSubmit.bind(undefined, group.name)}
                        />
                        <AdminGroupPermissionsForm
                            initialValues={{ permissions: toPermissionsArray(group.permissions) }}
                            
                            onSubmit={onPermissionsSubmit.bind(undefined, params.id)}
                        />
                        <AdminGroupDeleteForm />
                    </div>
                </div>
            </section>
        );
    }
}
