/// <reference path='../../../../../../../typings/index.d.ts' />

/*
    Maps to components/users/Details.jsx
*/

// Core Imports
import * as React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {ButtonToolbar, ButtonGroup, Button, Glyphicon, Label, Input, Alert} from 'react-bootstrap';

import {Spinner} from '../../../../components/Spinner/Spinner';

import {REDUCER_NAME} from './reducers';
import * as actions from './actions';

import {DeleteForm as UserDeleteForm} from '../DeleteForm';
import UserIdentityForm from './UserIdentityForm';
import PasswordChangeForm from './PasswordChangeForm';
import RolesForm from './RolesForm';

// Styles
import './_UserDetails.scss';


interface ReactRouterProps {

    // From React-Router
    params: any
    location: any

}

interface UserDetailsProps {
    loadFailed: boolean
    loading: boolean
    active: boolean
    username: string
    email: string
    
    roleAccount: string
    roleAccountId: string
    roleAdmin: string
    roleAdminId: string
}

interface DispatchProps {
    onLoadingUser: (id: string) => any
    onUserDetailsSubmit: (id: string, data: { active: boolean, username: string, email: string}) => any
    onUserChangePasswordSubmit: (id: string, data: { password: string }) => any
    onUserDeleteSubmit: (id: string, router: any, location: any) => any
}

function mapStateToProps(state): UserDetailsProps {
    return {
        loadFailed: _.get(state, REDUCER_NAME+'.loadFailed', false),
        loading: _.get(state, REDUCER_NAME+'.loading', false),
        active: _.get(state, REDUCER_NAME+'.data.isActive', false),
        username: _.get(state, REDUCER_NAME+'.data.username', ""),
        email: _.get(state, REDUCER_NAME+'.data.email', ""),
        roleAccount: _.get(state, REDUCER_NAME+'.data.roles.account.name', ""),
        roleAccountId: _.get(state, REDUCER_NAME+'.data.roles.account.id', ""),
        roleAdmin: _.get(state, REDUCER_NAME+'.data.roles.admin.name', ""),
        roleAdminId: _.get(state, REDUCER_NAME+'.data.roles.admin.id', "")
    };
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        onLoadingUser: function(id: string) {
            return dispatch(actions.get(id));
        },
        onUserDetailsSubmit: function(id: string, data: { active: boolean, username: string, email: string}) {
            return dispatch(actions.update(id, data.active, data.username, data.email))
        },
        onUserChangePasswordSubmit: function(id: string, data: { password: string}) {
            
            return dispatch(actions.changePassword(id, data.password));
            
        },
        onUserDeleteSubmit: function(id: string, router: any, location: any) {
            dispatch(actions.deleteUser(id, router, location));
        }
    }
}

class Container extends React.Component<UserDetailsProps & DispatchProps & ReactRouterProps, any> {

    public constructor(props?: any) {
        super(props);

    }

    static contextTypes: React.ValidationMap<any> = {
        router: React.PropTypes.object
    }
    
    context: {
        router: any
    }
    
    refs: {
        [key: string]: (Element | React.Component<any,any>);
        passwordChangeForm: (React.Component<any,any>);
    }
    
    public componentWillMount() {
        this.props.onLoadingUser(this.props.params.id)
    }

    public render(): React.ReactElement<{}> {
        const {
            onUserDetailsSubmit,
            onUserChangePasswordSubmit,
            onUserDeleteSubmit,
            
            username,
            active,
            email,
            roleAccount,
            roleAccountId,
            roleAdmin,
            roleAdminId,
            params,
            loading,
            loadFailed
        } = this.props;
        
        if (loading) {
            return (
                <section className='section-home container'>
                    <div className='row'>
                        <div className='col-sm-7'>
                            <h1 className='page-header'>
                                User Details
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
                                User Details
                            </h1>
                            
                            { 
                                loadFailed && 
                                <Alert bsStyle="danger">
                                    <h4>Could not load {params.id}</h4>
                                    <Link className="btn btn-default" to={_.join(_.dropRight(_.split(location.pathname, '/'), 1), '/')}>
                                        Back to search page
                                    </Link>
                                </Alert>
                            }
                            
                            { !loading && !loadFailed && 
                            <div>
                            <UserIdentityForm 
                                initialValues={
                                    {
                                        username,
                                        active,
                                        email
                                    }
                                }
                                onSubmit={onUserDetailsSubmit.bind(undefined, this.props.params.id)}
                                
                            />
                            
                            <RolesForm 
                                initialValues={
                                    {
                                        roleAccount,
                                        roleAccountId,
                                        roleAdmin,
                                        roleAdminId
                                    }
                                }
                                
                            />

                            <PasswordChangeForm ref="passwordChangeForm"
                                onSubmit={onUserChangePasswordSubmit.bind(undefined, this.props.params.id)}
                            />
                            
                            <UserDeleteForm 
                                onSubmit={onUserDeleteSubmit.bind(this, params.id, this.context.router, location)}
                            />
                            </div>
                            }
                        </div>
                    </div>
                </section>
            );
        
    }
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(Container);
