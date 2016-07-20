/// <reference path='../../../../../../../typings/index.d.ts' />

/*
    Maps to components/accounts/Details.jsx
*/

// Core Imports
import * as React from 'react';
import * as _ from 'lodash';

import {
    get,
    deleteAccount,
    linkUser,
    unlinkUser,
    updateName,
} from './actions';

import {Alert} from 'react-bootstrap';
import {Spinner} from '../../../../components/Spinner/Spinner';
import {UserLinkForm} from '../UserLinkForm';
import {NameDetailsForm} from '../NameDetailsForm';
import {DeleteForm} from '../DeleteForm';

import { connect } from 'react-redux';
import {Link} from 'react-router';

import {REDUCER_NAME} from './reducers';

// Styles
import './_AccountDetails.scss';


interface StateProps {
    // As expected from  mapStateToProps
    name: {
        firstName: string
        lastName: string
        middleName: string
    }
    
    user: {
        id: string,
        name: string
    }
    
    // Other
    loadFailed?: boolean
    loading?: boolean
    errorMsg?: string
    successMsg?: string
}

interface DispatchProps {
    onNameDetailsSubmit: (func: any) => any
    onUserUnlinkSubmit: () => any
    onUserLinkSubmit: (username: string) => any
    onDeleteAccountSubmit: (id: string, router: any, location: any) => any
    onLoadDetails: (func: string) => any
}

interface ReactRouterProps {
    params: any
    location: any
}

const mapStateToProps = (state: any): StateProps => {
    let name: any = _.get(state, REDUCER_NAME+'.data.name', {});
    return {
        name: { lastName: name.last, firstName: name.first, middleName: name.middle},
        user: _.get(state, REDUCER_NAME+'.data.user', undefined),
        loading: _.get(state, REDUCER_NAME+".loading", false),
        loadFailed: _.get(state, REDUCER_NAME+'.loadFailed', false)
    }
}

const mapDispatchToProps = (dispatch: (func: any) => any, ownProps: ReactRouterProps): DispatchProps => {
    return {
        onLoadDetails: (id: string) => {
            return dispatch(get(id))    
        },
        onNameDetailsSubmit: (data: any) => {
            return dispatch(updateName(ownProps.params.id, {
                firstName: data.firstName,
                middleName: data.middleName || '',
                lastName: data.lastName
            }));
        },
        onUserLinkSubmit: (username: string) => {
            return dispatch(linkUser(ownProps.params.id, username));
        },
        onUserUnlinkSubmit: () => {
            return dispatch(unlinkUser(ownProps.params.id));
        },
        onDeleteAccountSubmit: (id: string, router: any, location: any) => {
            return dispatch(deleteAccount(id, router, location));
        }
    }
}


class Container extends React.Component<StateProps & DispatchProps &ReactRouterProps, any> {

    public constructor(props: any = {}) {
        super(props);

    }
    
    static contextTypes: React.ValidationMap<any> = {
        router: React.PropTypes.object
    }
    
    context: {
        router: any
    }
    
    public componentWillMount() {
        this.props.onLoadDetails(this.props.params.id);
    }

    public render(): React.ReactElement<{}> {
        const { 
            name: {
                firstName,
                lastName,
                middleName
            },
            user,
            loadFailed,
            loading,
            onUserLinkSubmit,
            onUserUnlinkSubmit,
            onNameDetailsSubmit,
            onDeleteAccountSubmit,
            errorMsg,
            successMsg,
            params,
            location
        } = this.props;
        
        const viewBtn = <button>View</button>;
        
        return (
            <section className='section-account-details container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Account Details
                        </h1>
                        {
                            loading && 
                            <Alert bsStyle="info">
                                <span>Loading...</span>
                                <Spinner show={true} space="left" />
                            </Alert>
                        }
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

                {
                    !loading && !loadFailed &&

                        <div>
                        <NameDetailsForm 
                            initialValues={
                                {
                                    firstName,
                                    lastName,
                                    middleName
                                }
                            }
                            onSubmit={onNameDetailsSubmit} 
                        />
                        
                        
                        <UserLinkForm initialValues={{
                                username: user ? user.name : undefined,
                                userId: user ? user.id : undefined
                            }} onUserUnlinkSubmit={onUserUnlinkSubmit} onUserLinkSubmit={onUserLinkSubmit} />
                        
                        <DeleteForm 
                            onSubmit={onDeleteAccountSubmit.bind(undefined, params.id, this.context.router, location)} 
                        />
                        
                        </div>

                }
                </div>
                </div>
            </section>
        );
    }
}

export const AccountDetails = connect(mapStateToProps, mapDispatchToProps)(Container);
