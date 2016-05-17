// Core Imports
import * as React from 'react';
import * as _ from 'lodash';

import {ButtonToolbar, ButtonGroup, Button, Label, Input, Alert} from 'react-bootstrap';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {Spinner} from '../../../../components/Spinner/Spinner';
import { reduxForm }  from 'redux-form';

interface INameDetailsFormProps {
    // From redux-form
    fields?: {
        lastName: any,
        firstName: any,
        middleName: any
    }
    submitting?: boolean
    initialValues?: any

    handleSubmit?: (data) => any
    onSubmit?: (data) => any
    initializeForm?: (data) => any
    error?: string
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

class Form extends React.Component<INameDetailsFormProps, any> {
    constructor(props: INameDetailsFormProps) {
        super(props);
        this.state = {};
    }
    
    public render(): React.ReactElement<any> {
        const {
            handleSubmit,
            onSubmit,
            fields: {
                firstName,
                lastName,
                middleName,
            },
            submitting,
            initializeForm
        } = this.props;
        
        
        return (
            <form onSubmit={
                    (e) => { return handleSubmit(e).then((result) => {
                        
                        this.setState({ 
                                message: {
                                    visible: true,
                                    bsStyle: "success",
                                    content: (<span>Name saved</span>)
                                }
                            });
                            
                        initializeForm({
                            firstName: result.firstName,
                            lastName: result.lastName,
                            middleName: result.middleName
                        })
                    
                    })}
            }>
                <legend>Details</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                }
                
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
                        Save changes <Spinner show={submitting} space="left" />
                    </Button>
                </div>
            </form>
        )
    }
}

export const NameDetailsForm = reduxForm({
    form: "nameDetailsForm",
    fields: ['lastName', 'firstName', 'middleName'],
    validate,
    returnRejectedSubmitPromise: true
})(Form)
