/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/users/Details.jsx
*/

// Core Imports
import * as React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
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
    onUserDeleteSubmit: (data) => any
}

function mapStateToProps(state): UserDetailsProps {
    return {
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
        onUserDeleteSubmit: function(data) {
            
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class UserDetails extends React.Component<UserDetailsProps & DispatchProps & ReactRouterProps, any> {

    public constructor(props?: any) {
        super(props);

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
            loading
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
3
            return (
                <section className='section-home container'>
                    <div className='row'>
                        <div className='col-sm-7'>
                            <h1 className='page-header'>
                                User Details
                            </h1>
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
                                onSubmit={onUserDeleteSubmit.bind(this)}
                            />
                        </div>
                    </div>
                </section>
            );
        
    }
}
