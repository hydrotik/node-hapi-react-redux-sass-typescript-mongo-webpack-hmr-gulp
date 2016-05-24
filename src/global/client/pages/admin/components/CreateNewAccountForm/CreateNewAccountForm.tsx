/// <reference path='../../../../../../../typings/main.d.ts' />
import * as React from 'react';
import {reduxForm} from 'redux-form';

import {Spinner} from '../../../../components/Spinner/Spinner';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {Button} from '../../../../components/Button/Button';

import {Alert} from 'react-bootstrap';

interface BaseProps {
    onCancel?: (e: any) => any
    onSubmit?: (data: any) => any
}

interface ReduxFormProps extends BaseProps {
    fields: {
        firstName: any
        lastName: any
        middleName: any
    }
    onSubmit: (data: any) => any
    handleSubmit: (any) => any
    initializeForm: (any) => any
    submitting: boolean
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

class Form extends React.Component<BaseProps,any> {
    constructor(props?: BaseProps) {
        super(props);
        this.state = {};
    }
    
    render(): React.ReactElement<any> {
        const {
            fields: {
                firstName,
                lastName,
                middleName
            },
            handleSubmit,
            submitting,
            initializeForm,
            onCancel
        } = this.props as ReduxFormProps
        return (
            <form onSubmit={(e) => {
                return handleSubmit(e)
                .then(
                    (result) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: "success",
                                content: (<span>Admin created</span>)
                            }
                        })
                        initializeForm({
                            lastName: "",
                            firstName: "",
                            middleName: ""
                        })
                        
                        return Promise.resolve(result);
                    })
                    .catch((err) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: "danger",
                                content: (<span>{err.message}</span>)
                            }
                        })
                    }
                )
            }}>
                <legend>Create new admin</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                    }
                <TextControl
                    label="First name"
                    name="firstName"
                    disabled={submitting}
                    help={firstName.touched ? firstName.error : ""}
                    hasError={firstName.touched && firstName.error}
                    value={firstName.value}
                    {...firstName}
                />
                <TextControl
                    label="Middle name"
                    name="middleName"
                    disabled={submitting}
                    help={middleName.touched ? middleName.error : ""}
                    hasError={middleName.touched && middleName.error}
                    value={middleName.value}
                    {...middleName}
                />
                <TextControl
                    label="Last name"
                    name="lastName"
                    disabled={submitting}
                    help={lastName.touched ? lastName.error : ""}
                    hasError={lastName.touched && lastName.error}
                    value={lastName.value}
                    {...lastName}
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

export const CreateNewAccountForm = reduxForm({
    form: 'createNewAccountForm',
    fields: ['lastName', 'firstName', 'middleName'],
    validate,
    initialValues: {
        lastName: "",
        firstName: "",
        middleName: ""
    },
    returnRejectedSubmitPromise: true
})(Form);

