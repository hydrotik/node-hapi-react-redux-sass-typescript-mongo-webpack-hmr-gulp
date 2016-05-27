import * as React from 'react';
import {Button} from '../../../../../../components/Button/Button';
import {TextControl} from '../../../../../../components/TextControl/TextControl'
import {reduxForm} from 'redux-form';

import {Promise} from 'es6-promise';

interface ICreateNewAccountFormProps {
    fields?: {
        lastName: any,
        firstName: any,
        middleName: any
    },
    handleSubmit?: (func: any) => any,
    onSubmit?: (func: any) => any,
    resetForm?: any,
    
    submitting?: boolean
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
interface ICreateNewAccountFormState {
    
}
class CreateNewAccountForm extends React.Component<ICreateNewAccountFormProps, ICreateNewAccountFormState> {
    constructor(props: ICreateNewAccountFormProps) {
        super(props);
    }
    
    public refs:{
        [key: string]: (Element);
        lastname: (HTMLInputElement);
        middleName: (HTMLInputElement);
        firstname: (HTMLInputElement);
    }
    
    render() {
        const {
            fields: {
                firstName,
                middleName,
                lastName
            },
            handleSubmit,
            submitting,
            resetForm
        } = this.props;
        return (
             <div className="container-fluid">
                <div className='row'>
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
                <div className='row'>
                    <TextControl 
                        help={firstName.touched && firstName.error ? firstName.error : ""}
                        hasError={firstName.touched && firstName.error }
                        disabled={submitting}
                        name={"firstName"}
                        ref="firstName"
                        label={"First Name"}
                        value={firstName.value}
                        {...firstName}>
                    </TextControl>
                </div>
                <div className='row'>
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
             </div>

        )
    }
}

export default reduxForm({
    form: 'createNewAccountForm',
    fields: ['lastName','firstName','middleName'],
    validate
})(CreateNewAccountForm)
