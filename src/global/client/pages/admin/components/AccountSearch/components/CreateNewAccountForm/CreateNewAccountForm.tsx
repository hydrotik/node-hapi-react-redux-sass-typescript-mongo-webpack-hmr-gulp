import * as React from 'react';
import {Button} from '../../../../../../components/Button/Button';
import {TextControl} from '../../../../../../components/TextControl/TextControl'
import {reduxForm} from 'redux-form';

interface ICreateNewAccountFormProps {
    fields?: {
        accountName: any
    },
    handleSubmit?: (func: any) => any,
    onSubmit?: (func: any) => any,
    resetForm?: any,
    
    submitting?: boolean
}
const validate = (values) => {
    const accountNameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const errors:any = {  };
    if (!values.accountName) {
        errors.username = 'Required';
    }
    else if (values.accountName.length > 32 || values.accountName.length < 3) {
        errors.accountName = "Must be between 3 and 32 characters";
    }
    else if (!accountNameRegex.test(values.accountName)) {
        errors.accountName = 'Must start with a letter, and can only contain letters and numbers';
    }
    
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
        accountName: (HTMLInputElement);
    }
    
    render() {
        const {
            fields: {
                accountName
            },
            handleSubmit,
            submitting,
            resetForm
        } = this.props;
        return (
             <div className="container-fluid">
                <div className='row'>
                    <TextControl 
                        help={accountName.touched && accountName.error ? accountName.error : ""}
                        hasError={accountName.touched && accountName.error }
                        disabled={submitting}
                        name={"accountName"}
                        ref="accountName"
                        label={"Account Name"}
                        value={accountName.value}
                        {...accountName}>
                    </TextControl>
                </div>
             </div>

        )
    }
}

export default reduxForm({
    form: 'createNewAccountForm',
    fields: ['accountName'],
    validate
})(CreateNewAccountForm)
