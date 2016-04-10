import * as React from 'react';
import {Button} from '../../../../components/Button/Button';
import {TextControl} from '../../../../components/TextControl/TextControl'
import {reduxForm} from 'redux-form';

interface ICreateNewFormProps {
    fields?: {
        username: any,
        password: any,
        email: any
    },
    handleSubmit?: (func: any) => any,
    onSubmit?: (func: any) => any,
    resetForm?: any,
    
    submitting?: boolean
}
const validate = (values) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const emailRegex = /^.+\@.+$/
    const errors:any = {  };
    if (!values.username) {
        errors.username = 'Required';
    }
    else if (values.username.length > 32 || values.username.length < 3) {
        errors.username = "Must be between 3 and 32 characters";
    }
    else if (!usernameRegex.test(values.username)) {
        errors.username = 'Must start with a letter, and can only contain letters and numbers';
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
interface ICreateNewFormState {
    
}
class CreateNewForm extends React.Component<ICreateNewFormProps, ICreateNewFormState> {
    constructor(props: ICreateNewFormProps) {
        super(props);
    }
    
    public refs:{
        [key: string]: (Element);
        username: (HTMLInputElement);
        password: (HTMLInputElement);
        email: (HTMLInputElement);
    }
    
    render() {
        const {
            fields: {
                username,
                password,
                email
            }
            ,
            handleSubmit,
            submitting,
            resetForm
        } = this.props;
        return (
             <div className="container-fluid">
                <div className='row'>
                    <TextControl 
                        help={username.touched && username.error ? username.error : ""}
                        hasError={username.touched && username.error }
                        disabled={submitting}
                        name={"username"}
                        ref="username"
                        label={"Username"}
                        value={username.value}
                        {...username}>
                    </TextControl>
                </div>
                <div className='row'>
                    <TextControl
                        help={email.touched && email.error ? email.error : ""}
                        hasError={email.touched && email.error} 
                        disabled={submitting}
                        ref="email"
                        name={"email"}
                        label={"Email"}
                        value={email.value}
                        {...email}>
                    </TextControl>
                </div>
                <div className='row'>
                    <TextControl type={"password"}
                        help={password.touched && password.error ? password.error : ""}
                        hasError={password.touched && password.error}
                        disabled={submitting}
                        ref="password"
                        name={"password"}
                        label={"Password"}
                        value={password.value}
                        {...password}>
                    </TextControl>
                </div>
             </div>

        )
    }
}

export default reduxForm({
    form: 'createNewForm',
    fields: ['username', 'email', 'password'],
    validate
})(CreateNewForm)
