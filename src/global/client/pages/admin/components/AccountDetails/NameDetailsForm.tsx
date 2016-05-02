// Core Imports
import * as React from 'react';
import * as _ from 'lodash';

import {ButtonToolbar, ButtonGroup, Button, Glyphicon, Label, Input, Well} from 'react-bootstrap';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {ReduxAlertType, ReduxAlert} from '../../../../components/ReduxAlert/ReduxAlert';
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
    initialLastName?: string
    initialFirstName?: string
    initialMiddleName?: string

    handleSubmit?: any
    onSubmit?: (data) => any
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

class NameDetailsForm extends React.Component<INameDetailsFormProps, {}> {
    constructor(props: INameDetailsFormProps) {
        super(props);
    }
    
    public render(): React.ReactElement<{}> {
        const {
            handleSubmit,
            onSubmit,
            fields: {
                firstName,
                lastName,
                middleName,
            },
            submitting
        } = this.props;
        
        return (
            <form onSubmit={handleSubmit}>
                <legend>Details</legend>
                <ReduxAlert id="nameDetailsFormAlert" />
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
        )
    }
}

export default reduxForm({
    form: "nameDetailsForm",
    fields: ['lastName', 'firstName', 'middleName'],
    validate
},
(state, ownProps) => ({
    initialValues: {
        lastName: ownProps.initialLastName,
        firstName: ownProps.initialFirstName,
        middleName: ownProps.initialMiddleName
    }
})
)(NameDetailsForm)
