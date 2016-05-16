/// <reference path='../../../../../../../typings/main.d.ts' />

import * as React from 'react';
import {reduxForm} from 'redux-form';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {Spinner} from '../../../../components/Spinner/Spinner';
import {Button} from '../../../../components/Button/Button';

import {ButtonToolbar, ButtonGroup, Label, Input, Alert} from 'react-bootstrap';
import * as _ from 'lodash';

import {ReduxAlert, ReduxAlertType} from '../../../../components/ReduxAlert/ReduxAlert';

interface BaseProps {
    onSubmit?: (data) => any
    
    initialValues?: {
        password?: string
        passwordConfirm?: string
    }
}

interface ReduxFormProps extends BaseProps {
    submitting: boolean
    handleSubmit: (data) => any
    onSubmit: (data) => any
    initializeForm: (data: any) => any
    
    initialValues: {
        password: string
        passwordConfirm: string
    }
    
    fields: {
        password: any
        passwordConfirm: any
    }
    error: string
    valid: boolean
    
}

function validate(values) {
    let errors = {};
    
    if (!_.isEmpty(values.password) && values.password != '' && (values.password.length < 6 || values.password.length > 64)) {
        errors['password'] = 'Password length must be at least 6 characters and no greater than 64 characters';
    }
    else if (values.password != values.passwordConfirm) {
        errors['passwordConfirm'] = 'Password and confirmation fields do not match'
    }
    
    return errors;
}

class PasswordChangeForm extends React.Component<BaseProps, any> {
    constructor(props: BaseProps = {}) {
        super(props);
        
        this.state = {};
    }
    
    render(): React.ReactElement<any> {
        const {
            submitting,
            handleSubmit,
            initializeForm,
            valid,
            error,
            fields: {
                password,
                passwordConfirm
            }
        } = this.props as ReduxFormProps;

        return (
            <form onSubmit={
                (e) => { 
                    return handleSubmit(e)
                    .then((result) => {
                        this.setState({
                            
                            message: {
                                visible: true,
                                bsStyle: "success",
                                content: (<span>Password changed</span>)
                            }
                        });
                        
                        initializeForm({
                            password: "",
                            passwordConfirm: ""
                        })

                    })
                    .catch((err) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: "danger",
                                content: (<span>{err.error}</span>)
                            }
                        })

                    })
                }
            }>

                    


                <legend>Password</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                    }
                <TextControl
                    type="password"
                    label="New Password"
                    help={password.touched && password.error ? password.error : ""}
                    hasError={password.touched && password.error}
                    value={password.value}
                    disabled={submitting}
                    {...password}
                >
                </TextControl>
                <TextControl
                    type="password"
                    label="Confirm new password"
                    help={(password.touched || passwordConfirm.touched) && passwordConfirm.error ? passwordConfirm.error : ""}
                    hasError={(password.touched || passwordConfirm.touched) && passwordConfirm.error}
                    value={passwordConfirm.value}
                    disabled={submitting}
                    {...passwordConfirm}
                >
                </TextControl>
                
                <Button
                    type="submit"
                    inputClasses={{'btn-primary':true}}
                    disabled={password.value.length === 0 || submitting}
                >
                Set password <Spinner show={submitting} space="left" />
                </Button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'passwordChangeForm',
    fields: ['password', 'passwordConfirm'],
    validate,
    initialValues: {
        password: '',
        passwordConfirm: ''
    },
    returnRejectedSubmitPromise: true
    
},
undefined,
undefined)(PasswordChangeForm)

