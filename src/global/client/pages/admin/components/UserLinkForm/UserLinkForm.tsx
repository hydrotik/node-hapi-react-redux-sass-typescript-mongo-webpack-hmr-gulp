// Core Imports
import * as React from 'react';
import * as _ from 'lodash';
import {Promise} from 'es6-promise';

import {ButtonToolbar, ButtonGroup, Button, Glyphicon, Label, Input, Alert} from 'react-bootstrap';

import {TextControl} from '../../../../components/TextControl/TextControl';
import { reduxForm }  from 'redux-form';

interface IUserLinkFormProps {
    // From redux-form
    fields?: {
        userId: any
        username: any
    }
    submitting?: boolean
    initialValues?: any
    handleSubmit?: (data) => any
    onSubmit?: (data) => any
    initializeForm?: (data) => any
    
    initialUsername?: string
    onUserLinkSubmit?: (username: string) => any
    onUserUnlinkSubmit?: () => any
}

const validate = (values) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const errors:any = {  };
    
    const runValidations = (name: string, value?: string, isRequired: boolean = true) => {
        
        if (!value && !isRequired) {
            return;
        }
        
        if (!value) {

        }
        else if (value.length > 32) {
            errors[name] = "Must be less than 32 characters";
        }
        else if (!usernameRegex.test(value)) {
            errors[name] = 'Invalid characters';
        }
    }
    runValidations('username', values.username)
    
    return errors;
}

class Form extends React.Component<IUserLinkFormProps, any> {

    constructor(props: IUserLinkFormProps) {
        super(props);
        this.state = {};
    }
    
    public render(): React.ReactElement<any> {
        const {
            fields: {
                userId,
                username
            },
            onUserUnlinkSubmit,
            onUserLinkSubmit,
            handleSubmit,
            initializeForm,
            submitting
        } = this.props;
        
        
        return (
            <form onSubmit={handleSubmit((data) => {
                    if (!_.isEmpty(_.get(username, 'initialValue', undefined)) && onUserUnlinkSubmit) {
                        return onUserUnlinkSubmit()
                        .then((result) => {
                            this.setState({
                                message: {
                                    visible: true,
                                    bsStyle: "success",
                                    content: (<span>User unlinked</span>)
                                }
                            })
                            initializeForm({
                                username: "",
                                userId: ""
                            });
                            
                        })
                        .catch((err) => {
                            return Promise.reject({username: "User does not exist", _error: "User unlink failed"})
                        })
                    }
                    else if (onUserLinkSubmit) {
                        return onUserLinkSubmit(username.value)
                        .then((result) => {
                            this.setState({
                                message: {
                                    visible: true,
                                    bsStyle: "success",
                                    content: (<span>User linked</span>)
                                }
                            })

                            
                            initializeForm({
                                username: result.user.name,
                                userId: result.user.id
                            });
                        })
                        .catch((err) => {
                            return Promise.reject({username: "User does not exist", _error: "User unlink failed"})
                        })
                    }
                })}>
                <legend>User</legend>
                
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                }

                    <Input
                        type={"text"}
                        help={username.touched && username.error ? username.error : ""}
                        bsStyle={username.touched && username.error ? "error": null}
                        hasFeedBack={username.touched && username.error }
                        disabled={submitting || !_.isEmpty(_.get(username, 'initialValue', undefined))}
                        name={"username"}
                        ref="username"
                        label={"Username"}
                        value={username.value}
                        buttonAfter={
                            !_.isEmpty(username.initialValue) ? <Button disabled={submitting} href={"/admin/users/"+userId.value}>View</Button>
                            : null
                        }
                        {...username}>
                    </Input>

                    <Button
                        bsStyle={null}
                        className={_.get(username, 'initialValue', undefined) ? "btn btn-danger" : "btn btn-primary"}
                        disabled={submitting}
                        type={"submit"}
                    >
                        {_.get(username, 'initialValue', undefined) ? 'Unlink user' : 'Link user'} {submitting? <Glyphicon className="rotate-forever" glyph="glyphicon-refresh" /> : null}
                    </Button>

            </form>
                        
        )
    }
}

export const UserLinkForm = reduxForm({
    form: 'userLinkForm',
    fields: ['username', 'userId'],
    validate,
    returnRejectedSubmitPromise: true
})(Form);
