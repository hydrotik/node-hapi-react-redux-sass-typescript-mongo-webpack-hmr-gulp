/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/accounts/Details.jsx
*/

// Core Imports
import * as React from 'react';
import * as _ from 'lodash';

import {
    detailsFetch,
    detailsSaveChanges,
    linkAccount,
    unlinkAccount
} from '../../actions'

import {ButtonToolbar, ButtonGroup, Button, Glyphicon, Label, Input, Alert} from 'react-bootstrap';
import {TextControl} from '../../../../components/TextControl/TextControl';

import {UserLinkForm} from '../../../../components/UserLinkForm';
import {NameDetailsForm} from '../../../../components/NameDetailsForm';
import DeleteAccountForm from './DeleteAccountForm';

import { connect } from 'react-redux';
import { reduxForm }  from 'redux-form';

// Styles
import './_AccountDetails.scss';


interface StateProps {
    // As expected from  mapStateToProps
    data: {
        firstName: string
        lastName: string
        middleName: string
        username: string
        userId: string
    }
    
    // Other
    loading?: boolean
    errorMsg?: string
    successMsg?: string
}

interface DispatchProps {
    onNameDetailsSubmit: (func: any) => any
    onUserUnlinkSubmit: () => any
    onUserLinkSubmit: (username: string) => any
    onDeleteAccountSubmit: (func: any) => any
    onLoadDetails: (func: string) => any
}

interface ReactRouterProps {
    params: any
    location: any
}

const mapStateToProps = (state: any): StateProps => {
    return {
        data: _.get(state, 'accounts.details.data', { firstName: "", lastName: "", middleName: "", username: "", userId: "" }),
        loading: _.get(state, "accounts.details.loading", false)
    }
}

const mapDispatchToProps = (dispatch: (func: any) => any, ownProps: ReactRouterProps): DispatchProps => {
    return {
        onLoadDetails: (id: string) => {
            return dispatch(detailsFetch(id))    
        },
        onNameDetailsSubmit: (data: any) => {
            return dispatch(detailsSaveChanges(ownProps.params.id, {
                first: data.firstName,
                middle: data.middleName || '',
                last: data.lastName
            }));
        },
        onUserLinkSubmit: (username: string) => {
            return dispatch(linkAccount(ownProps.params.id, username));
        },
        onUserUnlinkSubmit: () => {
            return dispatch(unlinkAccount(ownProps.params.id));
        },
        onDeleteAccountSubmit: (data: any) => {
            console.log(data);
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class AccountDetails extends React.Component<StateProps & DispatchProps &ReactRouterProps, any> {

    public constructor(props: any = {}) {
        super(props);

    }
    
    public componentWillMount() {
        this.props.onLoadDetails(this.props.params.id);
    }

    public render(): React.ReactElement<{}> {
        const { 
            data: {
                firstName,
                lastName,
                middleName,
                username,
                userId
            },
            loading,
            onUserLinkSubmit,
            onUserUnlinkSubmit,
            onNameDetailsSubmit,
            onDeleteAccountSubmit,
            errorMsg,
            successMsg
        } = this.props;
        
        const viewBtn = <Button>View</Button>;
        
        return (
            <section className='section-account-details container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1 className='page-header'>
                            
                        </h1>
                    </div>
                </div>
                {!loading ?
                <div className='row'>

                    <div className='col-sm-8'>
                        
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
                        
                        {/* Rule of thumb: ONLY pass props needed from parent to child. */}
                        
                        <UserLinkForm initialValues={{username, userId}} onUserUnlinkSubmit={onUserUnlinkSubmit} onUserLinkSubmit={onUserLinkSubmit} />
                        
                        <DeleteAccountForm onSubmit={onDeleteAccountSubmit} />
                        
                    </div>
                    <div className='col-sm-4'>
                        <form>
                            <legend>Status</legend>
                        </form>
                    </div>
                </div>
                : null}
            </section>
        );
    }
}
