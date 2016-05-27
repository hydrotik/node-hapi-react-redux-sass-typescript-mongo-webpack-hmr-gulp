/// <reference path='../../../../../../../../../typings/main.d.ts' />
import * as React from 'react';
import {reduxForm} from 'redux-form';
import {Promise} from 'es6-promise';

import {Spinner} from '../../../../../../components/Spinner/Spinner';
import {TextControl} from '../../../../../../components/TextControl/TextControl';
import {Button} from '../../../../../../components/Button/Button';

import {Alert} from 'react-bootstrap';

interface BaseProps {
    onCancel?: (e: any) => any
    onSubmit?: (data: any) => any
}

interface ReduxFormProps extends BaseProps {
    fields: {
        username: any
        email: any
        password: any
    }
    onSubmit: (data: any) => any
    handleSubmit: (any) => any
    initializeForm: (any) => any
    submitting: boolean
}

const validate = (values) => {
    
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const emailRegex = /^.+\@.+$/
    const errors:any = {  };
    
    if (!values.username) {
        errors.username = 'Required';
    }
    else if (!usernameRegex.test(values.username)) {
        errors.username = 'Must start with a letter, and can only contain letters and numbers';
    }
    else if (values.username.length > 32 || values.username.length < 3) {
        errors.username = "Must be between 3 and 32 characters";
    }
    
    
    if (!values.password) {
        errors.password = 'Required';
    }
    else if (values.password.length < 6 || values.password.length > 64) {
        errors.password = 'Must be between 6 and 64 characters long'
    }
    
    if (!values.email) {
        errors.email = 'Required';
    }
    else if (!emailRegex.test(values.email)) {
        errors.email = 'Invalid email'
    }
    
    return errors;
}

class Form extends React.Component<BaseProps,any> {
    constructor(props?: BaseProps) {
        super(props);
        this.state = {};
    }
    
    render(): React.ReactElement<any> {
        const {
            fields: {
                username,
                password,
                email
            },
            handleSubmit,
            submitting,
            initializeForm,
            onCancel
        } = this.props as ReduxFormProps
        return (
            <form onSubmit={(e) => {
                return handleSubmit(e)
                .then((result) => {
                    this.setState({
                        message: {
                            visible: true,
                            bsStyle: "success",
                            content: (<span>User created</span>)
                        }
                    })
                    initializeForm({
                        username: "",
                        email: "",
                        password: ""
                    })
                    
                    return Promise.resolve(result);
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
            }}>
                <legend>Create new user</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                    }
                <TextControl
                    label="Username"
                    name="username"
                    disabled={submitting}
                    help={username.touched ? username.error : ""}
                    hasError={username.touched && username.error}
                    value={username.value}
                    {...username}
                />
                <TextControl
                    label="Email"
                    name="email"
                    disabled={submitting}
                    help={email.touched ? email.error : ""}
                    hasError={email.touched && email.error}
                    value={email.value}
                    {...email}
                />
                <TextControl
                    label="Password"
                    name="password"
                    type="password"
                    disabled={submitting}
                    help={password.touched ? password.error : ""}
                    hasError={password.touched && password.error}
                    value={password.value}
                    {...password}
                />
                
                <div>
                    <Button 
                            type="submit"
                            inputClasses={{'btn-primary': true}}
                    >
                        Create new <Spinner show={submitting} space="left" />
                    </Button>
                    &nbsp;
                    {
                        onCancel &&
                        <Button
                            type="button"
                            inputClasses={{'btn-default': true}}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    }
                </div>
            </form>
        )
    }
}

export const CreateNewUserForm = reduxForm({
    form: 'createNewUserForm',
    fields: ['username', 'email', 'password'],
    validate,
    initialValues: {
        username: "",
        email: "",
        password: ""
    },
    returnRejectedSubmitPromise: true
})(Form);

