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

import {ButtonToolbar, ButtonGroup, Button, Glyphicon, Label, Input, Well} from 'react-bootstrap';
import {TextControl} from '../../../../components/TextControl/TextControl';
import { reduxForm }  from 'redux-form';

// Styles
import './_AccountDetails.scss';

interface IAccountDetailsState {
    
}
interface IAccountDetailsProps {
    // From redux-form
    fields?: any
    submitting?: boolean
    initialValues?: any
    handleSubmit?: any
    error?: string
    
    // From MapDispatchToProps
    onNameDetailsSubmit?: (func: any) => any
    onUnlinkUserSubmit?: (func: any) => any
    onLinkUserSubmit?: (func: any) => any
    onDeleteAccountSubmit?: (func: any) => any
    onLoadDetails?: (func: string) => any
    
    // From react-router
    params?: any
    location?: any
    
    // Other
    loading?: boolean
}

const validate = (values) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z\-\.\'\ ]*$/;
    const errors:any = {  };
    
    const runValidations = (name: string, value?: string, isRequired: boolean = true) => {
        
        if (!value && !isRequired) {
            return;
        }
        
        if (!value) {
            errors[name] = 'Required';
        }
        else if (value.length > 32) {
            errors[name] = "Must be less than 32 characters";
        }
        else if (!nameRegex.test(value)) {
            errors[name] = 'Invalid characters';
        }
    }
    runValidations('firstName', values.firstName)
    runValidations('lastName', values.lastName);
    runValidations('middleName', values.middleName, false);
    
    return errors;
}

const mapStateToProps = (state: any): IAccountDetailsProps => {
    return {
        initialValues: _.get(state, 'accounts.details.initialValues'),
        loading: _.get(state, "accounts.details.loading", false)
    }
}

const mapDispatchToProps = (dispatch: (func: any) => any, ownProps: IAccountDetailsProps): IAccountDetailsProps => {
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
        onLinkUserSubmit: (data: any) => {
            return dispatch(linkAccount(ownProps.params.id, data.username));
        },
        onUnlinkUserSubmit: (data: any) => {
            return dispatch(unlinkAccount(ownProps.params.id));
        },
        onDeleteAccountSubmit: (data: any) => {
            console.log(data);
        }
    }
}

export class AccountDetails extends React.Component<IAccountDetailsProps, IAccountDetailsState> {

    public constructor(props: any = {}) {
        super(props);

    }
    
    public componentDidMount() {
        this.props.onLoadDetails(this.props.params.id);
    }

    public render(): React.ReactElement<{}> {
        const { 
            fields: {
                firstName,
                lastName,
                middleName,
                username,
                
            },
            loading,
            initialValues,
            submitting,
            handleSubmit
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
                    <Glyphicon glyph="glyphicon-refresh" />
                    {this.props.error && <Well bsStyle="error">Error</Well>}
                    <div className='col-sm-8'>
                        <form onSubmit={handleSubmit(this.props.onNameDetailsSubmit)}>
                            <legend>Details</legend>
                            <div className="row">
                                <TextControl 
                                    help={firstName.touched && firstName.error ? firstName.error : ""}
                                    hasError={lastName.touched && firstName.error }
                                    disabled={submitting}
                                    name={"firstName"}
                                    ref="firstName"
                                    label={"First Name"}
                                    value={firstName.value}
                                    {...firstName}>
                                </TextControl>
                            </div>
                            <div className="row">
                                <TextControl 
                                    help={middleName.touched && middleName.error ? middleName.error : ""}
                                    hasError={middleName.touched && middleName.error }
                                    disabled={submitting}
                                    name={"middleName"}
                                    ref="middleName"
                                    label={"Middle Name"}
                                    value={middleName.value}
                                    {...middleName}>
                                </TextControl>
                            </div>
                            <div className="row">
                                <TextControl 
                                    help={lastName.touched && lastName.error ? lastName.error : ""}
                                    hasError={lastName.touched && lastName.error }
                                    disabled={submitting}
                                    name={"lastName"}
                                    ref="lastName"
                                    label={"Last Name"}
                                    value={lastName.value}
                                    {...lastName}>
                                </TextControl>
                             </div>
                             <div className="row">
                                <Button
                                    bsStyle="primary"
                                    disabled={submitting}
                                    type={"submit"}
                                >
                                    Save changes {submitting? <Glyphicon className="rotate-forever" glyph="glyphicon-refresh" /> : null}
                                </Button>
                             </div>
                        </form>
                        
                        <form onSubmit={handleSubmit(_.get(initialValues, 'username', undefined) ? this.props.onUnlinkUserSubmit : this.props.onLinkUserSubmit)}>
                            <legend>User</legend>
                            
                            
                            <div className="row">
                               <Input
                                    type={"text"}
                                    help={username.touched && username.error ? username.error : ""}
                                    bsStyle={username.touched && username.error ? "error": null}
                                    hasFeedBack={username.touched && username.error }
                                    disabled={submitting || !_.isUndefined(_.get(initialValues, 'username', undefined))}
                                    name={"username"}
                                    ref="username"
                                    label={"Username"}
                                    value={username.value}
                                    buttonAfter={
                                        username ? <Button disabled={!_.get(initialValues, 'username', undefined)}>View</Button>
                                        : null
                                    }
                                    {...username}>
                                </Input>
                            </div>
                            <div className="row">
                                <Button
                                    bsStyle={null}
                                    className={_.get(initialValues, 'username', undefined) ? "btn btn-danger" : "btn btn-primary"}
                                    disabled={submitting}
                                    type={"submit"}
                                >
                                    {_.get(initialValues, 'username', undefined) ? 'Unlink user' : 'Link user'} {submitting? <Glyphicon className="rotate-forever" glyph="glyphicon-refresh" /> : null}
                                </Button>
                            </div>
                        </form>
                        <form onSubmit={handleSubmit(this.props.onDeleteAccountSubmit)}> 
                            <legend>Danger zone</legend>
                            <div className="row">
                                <Label bsStyle="danger">Warning</Label>This cannot be undone and could result in orphaned document relationships.
                            </div>
                            <div className="row">
                                <Button
                                    bsStyle={null}
                                    className="btn btn-danger"
                                    disabled={submitting}
                                    type={"submit"}
                                >
                                    Delete {submitting? <Glyphicon className="rotate-forever" glyph="glyphicon-refresh" /> : null}
                                </Button>
                            </div>
                        </form>
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

export const AccountDetailsForm = reduxForm(
    {
        form: 'accountDetailsForm',
        fields: ['lastName', 'firstName', 'middleName', 'username'],
        validate,
    },
    mapStateToProps,
    mapDispatchToProps
)(AccountDetails)