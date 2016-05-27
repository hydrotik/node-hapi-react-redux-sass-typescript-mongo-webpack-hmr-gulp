/// <reference path='../../../../../../../typings/index.d.ts' />

import * as React from 'react';
import {reduxForm} from 'redux-form';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {SelectControl} from '../../../../components/SelectControl/SelectControl';
import {Spinner} from '../../../../components/Spinner/Spinner';
import {Button} from '../../../../components/Button/Button';
import * as _ from 'lodash';

import {Glyphicon, Input, Label, MenuItem, Alert} from 'react-bootstrap';

interface ReduxFormProps {
    submitting: boolean
    invalid: boolean
    pristine: boolean
    handleSubmit: any
    onSubmit: any
    fields: {
        active: any
        username: any
        email: any
    }
}

interface IUserIdentityFormProps {
    loading: boolean
}


const validate = (values: any): any => {
    const nameRegex = /^[a-zA-Z][a-zA-Z\-\.\'\ ]*$/;
    const emailRegex = /.+@.+/;
    const errors:any = {  };
    
    const runValidations = (name: string, value?: string, isRequired: boolean = true, regex?: RegExp, maxLength: number = 32, minLength: number = 3 ) => {
        
        if (!value && !isRequired) {
            return;
        }
        
        if (!value) {
            errors[name] = 'Required';
        }
        else if (value.length > maxLength || value.length < minLength) {
            errors[name] = "Must be at least 3 characters and no more than 32 characters";
        }
        else if (!regex.test(value)) {
            errors[name] = 'Not formatted correctly';
        }
    }
    runValidations('username', values.username, true, nameRegex);
    runValidations('email', values.email, true, emailRegex, 256);
    
    return errors;
}

class UserIdentityForm extends React.Component<any, any> {
    constructor(props?: any) {
        super(props);
        this.state = {};
    }
    
    public render(): React.ReactElement<any> {
        const {
                fields: {
                    active,
                    username,
                    email
                },
                invalid,
                pristine,
                loading,
                submitting,
                handleSubmit
                
            } = this.props;
            if (loading) {
                return (
                    <Alert bsStyle="info">
                        <span>LOADING USER IDENTITY</span>
                        <Spinner show={true} space="left" />
                    </Alert>
                )
            }
            
        return (
            
            <form onSubmit={
                (e) => {
                    return handleSubmit(e)
                    .then((result) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: "success",
                                content: (<span>User updated</span>)
                            }
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
                <legend>Identity</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                    }

                    <SelectControl
                        name="active"
                        label="Active"
                        disabled={submitting}
                        value={active.value.toString()}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </SelectControl>

                

                    <TextControl
                        label="Username"
                        help={username.touched && username.error ? username.error : ""}
                        hasError={username.touched && username.error}
                        disabled={submitting}
                        value={username.value}
                        {...username}
                    />

                

                    <TextControl
                        label="Email"
                        help={email.touched && email.error ? email.error : ""}
                        hasError={email.touched && email.error}
                        disabled={submitting}
                        value={email.value}
                        {...email}
                    />

                

                    <Button 
                        type="submit"
                        inputClasses={{'btn-primary': true}}
                        disabled={invalid || submitting || pristine}
                    >
                        Save changes <Spinner show={submitting} space="left" />
                    </Button>

            </form>
        )
    }
}

export default reduxForm({
    form: "userIdentityForm",
    fields: ['active', 'username', 'email'],
    validate
})(UserIdentityForm);

